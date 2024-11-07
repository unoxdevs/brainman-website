<script lang="ts">
    import { chat } from "$lib/chat";
    import { writable } from "svelte/store";

    export let version: string = "v2";

    let userInput = "";
    let chatMessages = writable([]);
    let isThinking = false;
    let messagesContainer: HTMLDivElement;

    function formatCodeBlock(text: string): string {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const inlineCodeRegex = /`([^`]+)`/g;
        const boldRegex = /\*\*(.*?)\*\*/g;
        const italicRegex = /\*(.*?)\*/g;
        const strikethroughRegex = /--(.*?)--/g;

        let formattedText = text
            .replace(codeBlockRegex, (match, language, code) => {
                const lang = language || 'plaintext';
                const formattedCode = escapeHtml(code.trim());
                return `<pre class="bg-lighter rounded-lg p-4 my-2 overflow-x-auto"><code class="language-${lang}">${formattedCode}</code></pre>`;
            })
            .replace(inlineCodeRegex, (match, code) => {
                return `<code class="bg-lighter px-1 py-0.5 rounded font-mono opacity-80">${escapeHtml(code)}</code>`;
            })
            .replace(boldRegex, (match, text) => {
                return `<strong>${escapeHtml(text)}</strong>`;
            })
            .replace(italicRegex, (match, text) => {
                return `<em>${escapeHtml(text)}</em>`;
            })
            .replace(strikethroughRegex, (match, text) => {
                return `<del>${escapeHtml(text)}</del>`;
            });

        return formattedText;
    }

    function escapeHtml(text: string): string {
        return text.replace(/[&<>"']/g, function (char) {
            switch (char) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                default: return char;
            }
        });
    }
    async function sendMessage() {
        if (userInput.trim()) {
            const currentInput = userInput;
            userInput = "";
            
            chatMessages.update(messages => [...messages, { 
                text: currentInput, 
                sender: "user" 
            }]);
            
            isThinking = true;
            chatMessages.update(messages => [...messages, { 
                text: "Thinking...", 
                sender: "bot", 
                isThinking: true 
            }]);

            scrollToBottom();
            
            const response = await chat(currentInput, version);
            
            isThinking = false;
            chatMessages.update(messages => {
                const filteredMessages = messages.filter(msg => !msg.isThinking);
                return [...filteredMessages, { 
                    text: formatCodeBlock(response.data.answer), 
                    sender: "bot",
                    isHtml: true 
                }];
            });

            scrollToBottom();
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            messagesContainer?.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    async function generatePythonCode() {
        userInput = "Can you make me a simple calculator written in python?";
    }

    async function explainConcept() {
        userInput = "Can you explain the concept of a simple calculator?";
    }

    async function summarizeText() {
        userInput = "Summarize this text: Neptune has a system of five main rings...";
    }
</script>

<div class="min-h-screen p-2 sm:p-4 flex flex-col">
    <div bind:this={messagesContainer} class="flex-1 overflow-y-auto mb-2 sm:mb-4 max-w-3xl mx-auto w-full relative max-h-[calc(100vh-200px)]">
        {#if $chatMessages.length === 0}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p class="opacity-20 text-lg sm:text-2xl font-medium text-center px-4">What would you like to learn?</p>
        </div>
        {/if}
        <div class="space-y-3">
            {#each $chatMessages as message}
            <div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="{message.sender === 'user' ? 'bg-dark rounded-tl-lg rounded-bl-lg rounded-tr-lg' : 'bg-dark rounded-tr-lg rounded-br-lg rounded-tl-lg'} p-2 sm:p-3 max-w-[90%] sm:max-w-[80%] break-words border border-white/5 text-sm sm:text-base">
                    {#if message.isHtml}
                    {@html message.text}
                    {:else}
                    {message.text}
                    {/if}
                </div>
            </div>
            {/each}
        </div>
    </div>

    <div class="max-w-3xl mx-auto w-full px-2 sm:px-0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2 sm:mb-4">
            <select bind:value={version} class="bg-dark px-3 sm:px-4 py-3 sm:py-1 rounded-lg border border-white/5 text-xs sm:text-sm col-span-1">
                <option value="v1">Version 1</option>
                <option value="v2">Version 2</option>
            </select>
            <button on:click={generatePythonCode} class="bg-dark px-3 sm:px-4 py-3 sm:py-1 rounded-lg border border-white/5 text-xs sm:text-sm col-span-1">🐍 Generate Python Code</button>
            <button on:click={explainConcept} class="bg-dark px-3 sm:px-4 py-3 sm:py-1 rounded-lg border border-white/5 text-xs sm:text-sm col-span-1">🎓 Explain Simply</button>
            <button on:click={summarizeText} class="bg-dark px-3 sm:px-4 py-3 sm:py-1 rounded-lg border border-white/5 text-xs sm:text-sm col-span-1">🤔 Summarize</button>
        </div>
        <div class="relative">
            <textarea rows="3" bind:value={userInput} on:keydown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}} placeholder="Enter your message..." class="w-full bg-dark rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-12 focus:outline-none placeholder:opacity-20 border border-white/5 text-sm sm:text-base" disabled={isThinking}></textarea>
            <div class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 space-x-2 flex">
                <button on:click={sendMessage} class="bg-lighter py-1 px-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 border border-white/5" disabled={!userInput.trim() || isThinking}>
                    <i class="ri-arrow-up-line"></i>
                </button>
            </div>
        </div>
    </div>
</div>