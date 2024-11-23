<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { chatSessions, type ChatSession } from '../stores/chatStore';
    import { createEventDispatcher } from 'svelte';
    import { fade, slide } from 'svelte/transition';

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

    function getSessionTitle(session: ChatSession): string {
        if (!session.messages || session.messages.length === 0) return 'New Chat';
        const firstUserMessage = session.messages.find(m => m.sender === 'user');
        if (!firstUserMessage) return 'New Chat';
        return firstUserMessage.text.length > 30 
            ? firstUserMessage.text.substring(0, 30) + '...' 
            : firstUserMessage.text;
    }

    function getMessageCount(session: ChatSession): string {
        if (!session.messages) return '0 messages';
        const count = session.messages.length;
        return `${count} message${count === 1 ? '' : 's'}`;
    }

    let showClearConfirmation = false;

    function confirmClearAllSessions() {
        showClearConfirmation = true;
    }

    function cancelClearSessions() {
        showClearConfirmation = false;
    }

    function clearAllSessions() {
        if (browser) {
            chatSessions.set([]);
            localStorage.removeItem('chatSessions');
            dispatch('newChat');
            closeHistory();
            showClearConfirmation = false;
        }
    }

    function getSessionCount(): string {
        const count = $chatSessions.length;
        return `${count} chat${count === 1 ? '' : 's'}`;
    }

    onMount(() => {
        if (browser) {
            const savedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
            chatSessions.set(savedSessions);
        }
    });
</script>

{#if isOpen}
<div class="fixed inset-0 bg-black/80 z-30" on:click={closeHistory} transition:fade={{ duration: 200 }}></div>

<div class="fixed bottom-0 left-0 right-0 z-40 flex flex-col" transition:slide={{ duration: 300, axis: 'y' }}>
    <div class="mx-auto w-full max-w-2xl bg-[#1a1a1a]/95 border-t border-white/5 rounded-t-xl shadow-lg">
        <div class="p-4 border-b border-white/5">
            <div class="flex justify-between items-center">
                <h2 class="text-base font-medium text-white/90">Chat History ({getSessionCount()})</h2>
                <div class="flex items-center gap-2">
                    <button on:click={() => { dispatch('newChat'); closeHistory(); }} class="flex items-center gap-2 px-3 py-1.5 text-sm text-white/90 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] rounded-lg transition-all duration-200 max-sm:px-2 max-sm:py-1 max-sm:text-xs">
                        <i class="ri-add-line max-sm:text-sm"></i>
                        <span class="max-sm:hidden">New Chat</span>
                        <span class="hidden max-sm:inline">New</span>
                    </button>
                    <button on:click={confirmClearAllSessions} class="flex items-center gap-2 px-3 py-1.5 text-sm text-white/90 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] rounded-lg transition-all duration-200 max-sm:px-2 max-sm:py-1 max-sm:text-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03] disabled:hover:text-white/90"disabled={$chatSessions.length === 0}>
                        <i class="ri-delete-bin-line max-sm:text-sm"></i>
                        <span class="max-sm:hidden">Clear All</span>
                        <span class="hidden max-sm:inline">Clear</span>
                    </button>
                    <button on:click={closeHistory} class="p-1.5 text-white/40 hover:text-white/90 hover:bg-white/[0.03] rounded-lg transition-all duration-200">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
            {#if $chatSessions.length === 0}
            <div class="p-8 flex flex-col items-center justify-center text-center">
                <i class="ri-chat-3-line text-2xl text-white/30 mb-2"></i>
                <p class="text-sm text-white/50">No chat history yet</p>
                <p class="text-xs text-white/30 mt-1">Start a new conversation</p>
            </div>
            {:else}
            <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {#each $chatSessions as session (session.id)}
                <div class="group bg-white/[0.03] hover:bg-white/[0.06] p-3 rounded-lg border border-white/5 transition-all duration-200 cursor-pointer" on:click={() => loadSession(session)}>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 flex-1 min-w-0">
                            <i class="ri-chat-1-line text-white/40"></i>
                            <h3 class="text-sm font-medium text-white/90 truncate">
                                {getSessionTitle(session)}
                            </h3>
                        </div>
                        <button on:click|stopPropagation={() => deleteSession(session.id)} class="p-1.5 opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400/80 hover:bg-white/[0.03] rounded-lg transition-all duration-200" aria-label="Delete chat">
                            <i class="ri-delete-bin-line text-sm"></i>
                        </button>
                    </div>
                    <div class="flex items-center gap-2 mt-2 pl-6">
                        <p class="text-xs text-white/40">
                            {new Date(session.timestamp).toLocaleString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                        <span class="text-xs text-white/30">•</span>
                        <p class="text-xs text-white/40">{getMessageCount(session)}</p>
                    </div>
                </div>
                {/each}
            </div>
            {/if}
        </div>
    </div>
</div>

{#if showClearConfirmation}
<div class="fixed inset-0 bg-black/80 z-50" on:click={cancelClearSessions} transition:fade={{ duration: 200 }}></div>
<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#1a1a1a]/95 border border-white/5 rounded-lg shadow-lg p-4 w-96">
    <h2 class="text-base font-medium text-white/90 mb-2">Clear All Sessions</h2>
    <p class="text-sm text-white/50 mb-4">Are you sure you want to clear all chat sessions?</p>
    <div class="flex justify-end gap-2">
        <button on:click={cancelClearSessions} class="px-3 py-1.5 text-sm text-white/90 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] rounded-lg transition-all duration-200">
            Cancel
        </button>
        <button on:click={clearAllSessions} class="px-3 py-1.5 text-sm text-red-400/80 hover:text-red-400 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg transition-all duration-200">
            Clear All
        </button>
    </div>
</div>
{/if}
{/if}