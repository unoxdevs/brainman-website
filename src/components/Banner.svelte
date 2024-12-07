<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from './Navbar.svelte';
    import Footer from './Footer.svelte';
    import ChatHistory from './ChatHistory.svelte';
    import Typewriter from './Typewriter.svelte';
    import { chatSessions, currentSessionId, createNewSession, updateSession, getActiveSession } from '../stores/chatStore';
    import type { ChatMessage } from '../stores/chatStore';
    import toast, { Toaster } from 'svelte-french-toast';
    import { chat, webChat } from '../lib/chat';

    let userInput = '';
    let messagesContainer: HTMLElement;
    let isHistoryOpen = false;
    let isThinking = false;
    let chatMessages: ChatMessage[] = [];
    let isWebChatActive = false;

    const quickPrompts = [
        { title: 'Web Scraping', prompt: 'Write a Python script using BeautifulSoup to scrape book titles and prices from a hypothetical bookstore website. Show how to handle different HTML structures.' },
        { title: 'Machine Learning', prompt: 'Demonstrate a simple machine learning classification example using scikit-learn. Show how to split data, train a model, and make predictions.' },
        { title: 'File Encryption', prompt: 'Create a Python script that uses cryptography to encrypt and decrypt files, including key generation and secure file handling.' }
    ];

    function select(prompt: string) {
        userInput = prompt;
        const textarea = document.querySelector('textarea');
        textarea?.focus();
    }

    onMount(() => {
        const activeSession = getActiveSession();
        if (activeSession) {
            chatMessages = activeSession.messages;
            $currentSessionId = activeSession.id;
        } else {
            reset();
        }
    });

    function reset() {
        chatMessages = [];
        $currentSessionId = createNewSession();
        isHistoryOpen = false;
    }

    function load(event: CustomEvent) {
        const session = event.detail;
        chatMessages = session.messages;
        $currentSessionId = session.id;
        scroll();
    }

    function toggle() {
        isHistoryOpen = !isHistoryOpen;
    }

    async function send() {
        if (!userInput.trim() || isThinking) return;

        const userMessage = userInput.trim();
        userInput = "";
        isThinking = true;

        try {
            chatMessages = [...chatMessages, { sender: 'user', text: userMessage }];
            if ($currentSessionId) updateSession($currentSessionId, chatMessages);

            const response = isWebChatActive ? await webChat(userMessage) : await chat(userMessage);

            if (response && response.answer) {
                chatMessages = [...chatMessages, { sender: 'assistant', text: response.answer }];
                if ($currentSessionId) updateSession($currentSessionId, chatMessages);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Chat error:', error);
            chatMessages = [...chatMessages, { sender: 'assistant', text: error instanceof Error ? error.message : 'An error occurred. Please try again.' }];
        } finally {
            isThinking = false;
            scroll();
        }
    }

    function format(text: string): string {
        if (!text) return '';

        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
            const lang = language || '';
            const lines = code.trim().split('\n');
            const codeLines = lines.map((line: any, index: number) => {
                const lineNumber = (index + 1).toString().padStart(2, ' ');
                return `<div class="code-line"><span class="select-none text-white/30 w-8 inline-block">${lineNumber}</span><span class="select-text">${escape(line)}</span></div>`;
            }).join('');
            
            return `<pre class="bg-[#1a1a1a] rounded-lg p-3 my-2 overflow-x-auto font-mono"><code class="language-${lang} block">${codeLines}</code></pre>`;
        });

        text = text.replace(/`([^`]+)`/g, (match, code) => {
            return `<code class="bg-[#1a1a1a] px-2 py-1 rounded-lg font-mono text-sm">${escape(code)}</code>`;
        });

        text = text.replace(/\n/g, '<br>');

        return text;
    }

    function escape(text: string): string {
        const htmlEntities: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, char => htmlEntities[char] || char);
    }

    async function copy(text: string) {
        try {
            await navigator.clipboard.writeText(text).then(() => {
                toast.success('Copied to clipboard', {
                    style: "background-color: #1a1a1a; color: rgba(255, 255, 255, 0.67); border: 0.5px solid rgba(255, 255, 255, 0.13);",
                    duration: 2000,
                    position: 'bottom-right'
                });
            });
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    function keydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            send();
        }
    }

    function scroll() {
        messagesContainer?.scrollTo({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
    }

    function toggleWebChat(event: Event) {
        isWebChatActive = (event.target as HTMLInputElement).checked;
    }
</script>

<Toaster />
<Navbar {isHistoryOpen} {reset} on:click={toggle} />
<ChatHistory isOpen={isHistoryOpen} on:close={() => isHistoryOpen = false} on:newChat={reset} on:loadSession={load} />

<div class="min-h-screen flex flex-col text-white/90">
    <div bind:this={messagesContainer} class="flex-1 overflow-y-auto px-2 sm:px-6 py-4 sm:py-6 pt-14 sm:pt-20 max-w-3xl mx-auto w-full relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/10 scroll-smooth">
        {#if chatMessages.length === 0}
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 pt-14 sm:pt-20">
            <div class="text-center opacity-40">
                <h1 class="text-xl sm:text-2xl font-medium tracking-wide mb-2">
                    <Typewriter text="How can I help you?" speed={50} />
                </h1>
            </div>
        </div>
        {/if}
    
        <div class="space-y-5 sm:space-y-6 py-4 sm:py-6">
            {#each chatMessages as message}
            <div class="group flex items-start {message.sender === 'user' ? 'justify-end' : 'justify-start'} relative gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out">
                {#if message.sender === 'assistant'}
                <button on:click={() => copy(message.text)} class="p-1.5 text-white/20 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hidden sm:block self-center" aria-label="Copy message">
                    <i class="ri-file-copy-line text-xs"></i>
                </button>
                {/if}
                <div class="max-w-[92%] sm:max-w-[85%] {message.sender === 'user' ? 'bg-white/5 rounded-2xl rounded-br-sm' : 'bg-white/[0.03] rounded-2xl rounded-bl-sm'} px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-sm transition-all duration-300">
                    {#if message.sender === 'assistant'}
                    <div class="whitespace-pre-wrap break-words leading-relaxed text-[13px] sm:text-sm [&_pre]:font-mono [&_pre]:text-[0.9em] [&_pre]:leading-relaxed [&_pre]:my-3 [&_code]:font-mono [&_pre]:bg-black/30 [&_pre]:backdrop-blur [&_pre]:border [&_pre]:border-white/[0.03] [&_pre]:rounded-xl [&_pre]:px-4 [&_pre]:py-3">{@html format(message.text)}</div>
                    {:else}
                    <p class="whitespace-pre-wrap break-words leading-relaxed text-[13px] sm:text-sm">{message.text}</p>
                    {/if}
                </div>
                {#if message.sender === 'user'}
                <button on:click={() => copy(message.text)} class="p-1.5 text-white/20 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hidden sm:block self-center" aria-label="Copy message">
                    <i class="ri-file-copy-line text-xs"></i>
                </button>
                {/if}
            </div>
            {/each}
            {#if isThinking}
            <div class="flex justify-start animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div class="bg-white/[0.03] rounded-2xl rounded-bl-sm px-5 py-3 backdrop-blur-sm">
                    <div class="flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                        <div class="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse [animation-delay:150ms]"></div>
                        <div class="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse [animation-delay:300ms]"></div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>

    <div class="max-w-3xl w-full px-2 sm:px-6 mx-auto mb-4 sm:mb-6 mt-2">
        <div class="flex flex-wrap gap-2 mb-4 justify-center">
            {#each quickPrompts as prompt}
            <button on:click={() => select(prompt.prompt)} class="bg-white/5 text-white/70 rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-white/10 hover:text-white/90 transition-all duration-200 border border-white/5 hover:border-white/10">
                {prompt.title}
            </button>
            {/each}
        </div>
        <form on:submit|preventDefault={send} class="relative group">
            <textarea bind:value={userInput} on:keydown={keydown} placeholder="Type a message or choose a quick prompt..." class="w-full bg-white/[0.03] text-white/90 placeholder:text-white/20 text-[13px] sm:text-sm font-normal border border-white/5 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 pr-24 resize-none focus:outline-none focus:border-white/10 focus:bg-white/[0.04] transition-all duration-200 min-h-[48px] sm:min-h-[56px] max-h-[160px] sm:max-h-[200px] backdrop-blur-sm"></textarea>
            <div class="absolute bottom-[10px] sm:bottom-[14px] right-3 sm:right-4 flex items-center space-x-2">
                <button type="button" on:click={() => isWebChatActive = !isWebChatActive} class="p-1.5 text-white/40 hover:text-white/60 hover:scale-110 rounded-full transition-all duration-300 group-focus-within:text-white/60 active:scale-95 hover:rotate-12" aria-label="Toggle Web Search">
                    <i class="ri-global-line text-base {isWebChatActive ? 'text-green-500' : 'opacity-50'}"></i>
                </button>
                <button disabled={userInput.trim() === ""} type="submit" class="p-1.5 text-white/40 hover:text-white/90 hover:scale-110 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0 group-focus-within:text-white/60 active:scale-95 hover:rotate-12" aria-label="Send message">
                    <i class="ri-send-plane-line text-base"></i>
                </button>
            </div>
        </form>
    </div>
</div>

<Footer />
