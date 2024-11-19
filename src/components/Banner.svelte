<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { ChatMessage } from '../stores/chatStore';
    import { createNewSession, updateSession } from '../stores/chatStore';
    import { chat } from '../lib/chat';
    import Navbar from './Navbar.svelte';
    import ChatHistory from './ChatHistory.svelte';

    let userInput = "";
    let chatMessages = writable<ChatMessage[]>([]);
    let isThinking = false;
    let messagesContainer: HTMLDivElement;
    let isHistoryOpen = false;
    let currentSessionId = createNewSession();

    function toggleHistory() {
        isHistoryOpen = !isHistoryOpen;
    }

    function handleNewChat() {
        chatMessages.set([]);
        currentSessionId = createNewSession();
    }

    function handleLoadSession(event: CustomEvent<any>) {
        const session = event.detail;
        currentSessionId = session.id;
        chatMessages.set(session.messages || []);
    }

    function formatMessage(text: string): string {
        if (!text) return '';

        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
            const lang = language || '';
            return `<pre class="bg-[#1a1a1a] rounded-lg p-3 my-2 overflow-x-auto"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
        });

        text = text.replace(/`([^`]+)`/g, (match, code) => {
            return `<code class="bg-[#1a1a1a] px-2 py-1 rounded font-mono text-sm">${escapeHtml(code)}</code>`;
        });

        text = text.replace(/\n/g, '<br>');

        return text;
    }

    function escapeHtml(text: string): string {
        const htmlEntities: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, char => htmlEntities[char] || char);
    }

    async function sendMessage(event?: Event) {
        if (event?.preventDefault) {
            event.preventDefault();
        }

        if (!userInput.trim() || isThinking) return;

        const userMessage = userInput.trim();
        userInput = "";
        isThinking = true;

        try {
            $chatMessages = [...$chatMessages, { sender: 'user', text: userMessage }];
            updateSession(currentSessionId, $chatMessages);

            const response = await chat(userMessage);
            
            if (response && response.answer) {
                $chatMessages = [...$chatMessages, { 
                    sender: 'assistant', 
                    text: response.answer 
                }];
                updateSession(currentSessionId, $chatMessages);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Chat error:', error);
            $chatMessages = [...$chatMessages, { 
                sender: 'assistant', 
                text: error instanceof Error ? error.message : 'An error occurred. Please try again.' 
            }];
        } finally {
            isThinking = false;
            setTimeout(() => {
                messagesContainer?.scrollTo({
                    top: messagesContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    $: if (messagesContainer && $chatMessages.length) {
        setTimeout(() => {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }
</script>

<Navbar {isHistoryOpen} {handleNewChat} on:click={toggleHistory} />
<ChatHistory isOpen={isHistoryOpen} on:close={() => isHistoryOpen = false} on:newChat={handleNewChat} on:loadSession={handleLoadSession} />

<div class="min-h-screen flex flex-col bg-[#111111] text-white">
    <div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded">
        {#if $chatMessages.length === 0}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center text-white/50">
                <h1 class="text-3xl font-bold mb-3">Welcome to Brainman Chat</h1>
                <p class="text-lg">Start a conversation by typing a message below.</p>
            </div>
        </div>
        {:else}
        <div class="space-y-6 py-10">
            {#each $chatMessages as message}
            <div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[85%] {message.sender === 'user' ? 'bg-[#2a2a2a]' : 'bg-[#1e1e1e]'} rounded-2xl p-4 shadow-lg">
                    {#if message.sender === 'assistant'}
                        <div class="whitespace-pre-wrap break-words leading-relaxed [&_pre]:font-mono [&_pre]:text-[0.9em] [&_pre]:leading-6 [&_pre]:my-4 [&_code]:font-mono">{@html formatMessage(message.text)}</div>
                    {:else}
                        <p class="whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
                    {/if}
                </div>
            </div>
            {/each}
            {#if isThinking}
            <div class="flex justify-start">
                <div class="bg-[#1e1e1e] rounded-2xl p-4 shadow-lg animate-pulse">
                    <p class="text-white/70">Thinking<span class="animate-[dots_1.5s_infinite] after:content-['.'] after:animate-[dots_1.5s_infinite]"></span></p>
                </div>
            </div>
            {/if}
        </div>
        {/if}
    </div>

    <div class="fixed bottom-0 left-0 right-0">
        <div class="max-w-4xl mx-auto px-4 py-4">
            <form on:submit={sendMessage} class="relative">
                <textarea
                    bind:value={userInput}
                    on:keydown={handleKeydown}
                    placeholder="Type your message..."
                    class="w-full bg-[#1a1a1a] rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none text-white placeholder:text-white/30 min-h-[52px] max-h-32 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded"
                    rows="1"
                    disabled={isThinking}
                ></textarea>
                <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isThinking || !userInput.trim()}>
                    <i class="ri-send-plane-fill text-xl"></i>
                </button>
            </form>
        </div>
    </div>
</div>

<style>
    @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
    }
</style>