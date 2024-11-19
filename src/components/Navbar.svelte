<script lang="ts">
    export let isHistoryOpen = false;
    export let handleNewChat: () => void;
</script>

<div class="fixed top-0 right-0 p-4 z-50 flex gap-2" class:hidden={isHistoryOpen}>
    <button on:click={handleNewChat} class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors duration-200" aria-label="New chat">
        <i class="ri-add-line text-xl"></i>
    </button>
    <button on:click class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors duration-200" aria-label="Toggle chat history">
        <i class="ri-history-line text-xl"></i>
    </button>
</div>