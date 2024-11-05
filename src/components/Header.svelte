<script lang="ts">
    import { chat } from "$lib/chat";
    import { writable } from "svelte/store";

    let userInput = "";
    let chatMessages = writable([]);
    let isThinking = false;
    let messagesContainer: HTMLDivElement;

    function formatCodeBlock(text: string): string {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const inlineCodeRegex = /`([^`]+)`/g;

        let formattedText = text.replace(codeBlockRegex, (match, language, code) => {
            const lang = language || 'plaintext';
            const formattedCode = code.trim();
            return `<pre class="bg-lighter rounded-lg p-4 my-2 overflow-x-auto"><code class="language-${lang}">${formattedCode}</code></pre>`;
        });

        formattedText = formattedText.replace(inlineCodeRegex, '<code class="bg-lighter px-1 py-0.5 rounded font-mono opacity-80">$1</code>');

        return formattedText;
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
            
            const response = await chat(currentInput);
            
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
        userInput = "Can you make me a simple calculator written in python?"
    }

    async function explainConcept() {
        userInput = "Can you explain the concept of a simple calculator?"
    }

    async function summarizeText() {
        userInput = "Summarize this text: Neptune has a system of five main rings. The rings, originally called “arcs”, were discovered on July 22, 1984 by the team of Patrice Bouchet, Reinhold Häfner and Jean Manfroid at the La Silla Observatory in Chile and by F. Vilas and L. R. Elicer at the Cerro Tololo American Observatory as part of a program led by William Hubbard. The rings were photographed by the Voyager 2 spacecraft in 1989. The densest parts of the rings are comparable to the relatively less dense parts of Saturn's main rings (such as the C ring and the Cassini section), but most of Neptune's ring system is relatively thin, faint and dusty, more similar to Jupiter's rings. Neptune's rings are named after astronomers who contributed to important studies of the planet: Galle, Le Verrier, Lassell, Arago and Adams. Neptune has another faint, unnamed ring that coincides with the orbit of one of its moons, Galatea. Its other three moons, Naiad, Thalassa and Despina, orbit between the rings."
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
        <div class="flex flex-wrap justify-center gap-2 mb-2 sm:mb-4">
            <button on:click={generatePythonCode} class="bg-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/5 text-xs sm:text-sm">🐍 Generate Python Code</button>
            <button on:click={explainConcept} class="bg-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/5 text-xs sm:text-sm">🎓 Explain Simply</button>
            <button on:click={summarizeText} class="bg-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/5 text-xs sm:text-sm">🤔 Summarize</button>
        </div>
        <div class="relative">
            <textarea rows="3" bind:value={userInput} on:keydown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Enter your message..." class="w-full bg-dark rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-12 focus:outline-none placeholder:opacity-20 border border-white/5 text-sm sm:text-base" disabled={isThinking}></textarea>
            <div class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 space-x-2 flex">
                <button on:click={sendMessage} class="bg-lighter py-1 px-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 border border-white/5" disabled={!userInput.trim() || isThinking}>
                    <i class="ri-arrow-up-line"></i>
                </button>
            </div>
        </div>
    </div>
</div>