<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { chatSessions, type ChatSession } from '../stores/chatStore';
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    export let isOpen = false;
    const dispatch = createEventDispatcher();
    
    function closeHistory() {
        dispatch('close');
    }

    function deleteSession(sessionId: string) {
        chatSessions.update(sessions => {
            const updatedSessions = sessions.filter(s => s.id !== sessionId);
            if (browser) {
                localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
            }
            return updatedSessions;
        });
    }

    function loadSession(session: ChatSession) {
        dispatch('loadSession', session);
        closeHistory();
    }

    function getFirstMessage(messages: any[] | undefined): string {
        if (!messages || messages.length === 0) return 'New Chat';
        const firstUserMessage = messages.find(m => m.sender === 'user');
        return firstUserMessage ? firstUserMessage.text : 'New Chat';
    }

    onMount(() => {
        if (browser) {
            const savedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
            chatSessions.set(savedSessions);
        }
    });
</script>

{#if isOpen}
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30" on:click={closeHistory} transition:fade={{ duration: 200 }}></div>
{/if}

<div class="fixed top-0 right-0 h-full w-80 bg-[#1a1a1a] transform transition-transform duration-300 ease-out {isOpen ? 'translate-x-0' : 'translate-x-full'} z-40 flex flex-col shadow-xl">
    <div class="p-4 border-b border-white/10 bg-[#1a1a1a]/80 backdrop-blur-sm">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Chat History</h2>
            <button on:click={closeHistory} class="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200" aria-label="Close history">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>

        <button 
            on:click={() => { 
                chatSessions.set([]); 
                if (browser) { 
                    localStorage.setItem('chatSessions', '[]'); 
                } 
                dispatch('newChat');
                closeHistory();
            }} 
            class="w-full bg-[#252525] hover:bg-[#2a2a2a] px-4 py-3 rounded-xl border border-white/10 transition-all duration-200 flex items-center gap-3 group"
        >
            <i class="ri-add-line text-lg text-white/70 group-hover:text-white/90"></i>
            <span class="font-medium">New Chat</span>
        </button>
    </div>

    <div class="flex-1 overflow-y-auto">
        {#if $chatSessions.length === 0}
        <div class="p-4 flex flex-col items-center justify-center h-full text-center">
            <i class="ri-chat-3-line text-4xl text-white/30 mb-3"></i>
            <p class="text-white/50">No chat history yet</p>
            <p class="text-sm text-white/30 mt-1">Start a new conversation</p>
        </div>
        {:else}
        <div class="p-4 space-y-2">
            {#each $chatSessions as session (session.id)}
            <div class="group flex items-center justify-between bg-[#252525] hover:bg-[#2a2a2a] p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer" on:click={() => loadSession(session)}>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium truncate">
                        {getFirstMessage(session.messages)}
                    </h3>
                    <p class="text-xs text-white/40 mt-1">
                        {new Date(session.timestamp).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                <button on:click|stopPropagation={() => deleteSession(session.id)} class="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-lg transition-all duration-200" aria-label="Delete chat">
                    <i class="ri-delete-bin-line text-red-400/80 hover:text-red-400"></i>
                </button>
            </div>
            {/each}
        </div>
        {/if}
    </div>
</div>

<style>
    .overflow-y-auto {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    }

    .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
        background: transparent;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
</style>