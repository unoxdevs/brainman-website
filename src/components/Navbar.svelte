<script lang="ts">
    export let isHistoryOpen = false;
    export let reset: () => void;
</script>

<div class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-white/[0.03] backdrop-blur-sm border-b border-white/5 px-4 sm:px-6 py-3" class:hidden={isHistoryOpen}>
    <div class="relative group">
        <div class="absolute inset-0 bg-white/[0.03] blur-lg rounded-full scale-125 transition-transform duration-300"></div>
        <span class="text-xl font-bold text-white/90 relative">Brainman</span>
    </div>
    <div class="flex items-center gap-1">
        <button on:click={reset} class="p-2 text-white/40 hover:text-white/90 hover:bg-white/[0.03] rounded-lg transition-all duration-200" aria-label="New chat">
            <i class="ri-add-line text-base"></i>
        </button>
        <button on:click class="p-2 text-white/40 hover:text-white/90 hover:bg-white/[0.03] rounded-lg transition-all duration-200" aria-label="Toggle chat history">
            <i class="ri-history-line text-base"></i>
        </button>
    </div>
</div>