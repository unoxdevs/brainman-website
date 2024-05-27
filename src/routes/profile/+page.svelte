<script lang="ts">
    import db from '$lib/pocketbase';
    import { userHistory, clearHistory } from '$lib/history';
    import Footer from "../../components/Footer.svelte";
    import { logout } from '$lib/logout';
    import { goto } from '$app/navigation';

    let isValid = db.authStore.isValid;
    let user: any = db.authStore.model;

    let showModal = false;
    let confirmationText = '';
    let dropdownOpen = false;

    async function clickLogout() {
        await logout();
        window.location.href = "/";
    }

    async function clearUserHistory() {
        await clearHistory();
        showModal = false;
    }

    async function closeModal() {
        showModal = false;
    }

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }
</script>

{#if isValid}
<div class="p-7 md:px-10 lg:px-10 max-w-[100rem] min-h-screen mx-auto my-5 rounded-xl bg-white">
    <div class="flex justify-between">
        <div class="items-center">
            <h1 class="text-xl font-semibold">{user.username}'s Profile</h1>
            <p class="text-sm"><i class="ri-mail-line"></i> {user.email}</p>
        </div>
        <div class="hidden md:flex items-center">
            {#if $userHistory.length === 0}
            <button disabled class="border p-1.5 px-5 rounded-lg ml-3 hover:bg-gray-50 transition-all duration-300 opacity-50"><i class="ri-delete-bin-line"></i> Clear</button>
            {:else}
            <button on:click={() => showModal = true} class="border p-1.5 px-5 rounded-lg ml-3 cursor-pointer hover:bg-gray-50 transition-all duration-300"><i class="ri-delete-bin-line"></i> Clear</button>
            {/if}
            <button on:click={() => goto("/dashboard")} class="border p-1.5 px-5 rounded-lg ml-3 cursor-pointer hover:bg-gray-50 transition-all duration-300"><i class="ri-dashboard-line"></i> Go to Dashboard</button>
            <button on:click={clickLogout} class="border p-1.5 px-5 rounded-lg ml-3 cursor-pointer hover:bg-gray-50 transition-all duration-300"><i class="ri-logout-box-r-line"></i> Log out</button>
        </div>
        <div class="md:hidden relative">
            <button on:click={toggleDropdown} class="border p-1.5 px-5 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <i class="ri-menu-line"></i>
            </button>
            {#if dropdownOpen}
            <div class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 p-2">
                {#if $userHistory.length === 0}
                <button disabled class="border-b p-1.5 px-5 w-full text-left hover:bg-gray-50 transition-all duration-300 opacity-50">
                    <i class="ri-delete-bin-line"></i> Clear
                </button>
                {:else}
                <button on:click={() => showModal = true} class="border-b p-1.5 px-5 w-full text-left hover:bg-gray-50 transition-all duration-300">
                    <i class="ri-delete-bin-line"></i> Clear
                </button>
                {/if}
                <button on:click={() => goto("/dashboard")} class="border-b p-1.5 px-5 w-full text-left hover:bg-gray-50 transition-all duration-300">
                    <i class="ri-dashboard-line"></i> Go to Dashboard
                </button>
                <button on:click={clickLogout} class="p-1.5 px-5 w-full text-left hover:bg-gray-50 transition-all duration-300">
                    <i class="ri-logout-box-r-line"></i> Log out
                </button>
            </div>
            {/if}
        </div>
    </div>
    
    <div class="mt-5">
        <p class="text-base">History:</p>
    </div>
    <div class="mt-2">
        {#if $userHistory.length > 0}
            {#each $userHistory as item, index (item.timestamp)}
                <div class="border p-2 rounded-lg mt-2">
                    <p class="mb-1"><strong>{item.username}:</strong></p>
                    <p class="text-xs mb-1"><em>Prompt: {item.prompt}</em></p>
                    <p class="mb-1 text-sm">{item.response}</p>
                    <p class="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
            {/each}
        {:else}
            <p>No history available.</p>
        {/if}
    </div>
</div>

{#if showModal}
    <div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center px-5 md:px-0 lg:px-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="relative bg-white rounded-lg max-w-md mx-auto p-8">
            <h1 class="text-xl font-semibold mb-4">Clear History</h1>
            <input type="text" class="border border-gray-300 p-2 rounded-md w-full mb-4" placeholder="Type 'Confirm' to confirm" bind:value={confirmationText}>
            {#if confirmationText.toLowerCase() === 'confirm'}
            <button on:click={clearUserHistory} class="bg-[#0676ff] text-white px-4 py-2 rounded-md disabled:opacity-50"><i class="ri-delete-bin-line"></i> Clear History</button>
            {:else}
            <button disabled on:click={clearUserHistory} class="bg-[#0676ff] text-white px-4 py-2 rounded-md disabled:opacity-50 opacity-50"><i class="ri-delete-bin-line"></i> Clear History</button>
            {/if}
            <button on:click={closeModal} class="border px-4 py-2 rounded-md ml-2 disabled:opacity-50">Cancel</button>
        </div>
    </div>
{/if}

<Footer />
{:else}
<div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-80">
        <p class="text-sm text-center py-2 font-medium mb-2 bg-[#289aff] text-white">You are not signed in!</p>
        <h1 class="uppercase text-6xl font-semibold text-center bg-[#b9e4ff] py-2 text-[#289aff]">Error</h1>
        <div class="mt-2 text-center text-sm">
            <button on:click={() => window.location.href = "/"} class="p-2 px-3 w-full bg-[#289aff] text-white">Go to Home</button>
        </div>
    </div>
</div>
{/if}
