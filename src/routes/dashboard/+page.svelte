<script lang="ts">
    import axios from "axios";
    import db from "$lib/pocketbase";
    import Footer from "../../components/Footer.svelte";
    import { CodeBlock } from 'svhighlight';
    import { logout } from "$lib/logout";
    import { goto } from "$app/navigation";
    import { addToHistory } from '$lib/history';

    let isValid = db.authStore.isValid;
    let user: any = db.authStore.model;
    let prompt = "";
    let data = "";
    let textData = "";
    let codeData = "";
    let language = "";
    let loading = false;
    let dropdownOpen = false;

    let models = [
        {
            name: "v4",
            value: "v4"
        },
        {
            name: "v3-turbo",
            value: "v3-turbo"
        },
        {
            name: "v4-32k",
            value: "v4-32k"
        },
        {
            name: "gemini",
            value: "gemini"
        },
        {
            name: "leo",
            value: "leo"
        }
    ];

    let selectedModel = models[0].value;

    async function chat() {
        loading = true;
        data = "";
        textData = "";
        codeData = "";
        language = "";

        const response = await axios.post("https://ai.unoxdevs.fun/chat", {
            prompt: prompt,
            version: selectedModel,
        });

        data = response.data;

        const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
        let codeBlocks = [];
        let match;
        while ((match = codeRegex.exec(data)) !== null) {
            codeBlocks.push({
                language: match[1] || '',
                code: match[2]
            });
        }
        
        if (codeBlocks.length > 0) {
            codeData = codeBlocks.map(block => block.code).join('\n');
            language = codeBlocks[0].language;
        }
        textData = data.replace(codeRegex, '').trim();

        loading = false;
        addToHistory(user.username, prompt, data);
        prompt = "";
    }

    async function clickLogout() {
        await logout();
    }

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }
</script>

{#if isValid}
<div class="p-7 md:px-10 lg:px-10 max-w-[100rem] min-h-screen mx-auto my-5 rounded-xl bg-white">
    <div>
        <div class="flex justify-between">
            <div class="flex items-center">
                <img class="w-5 h-5" src="https://www.upload.ee/image/16675034/brainman__2_.png" alt="Brainman logo">
                <h1 class="text-xl uppercase font-semibold">Brainman</h1>
            </div>
            <div class="hidden md:flex items-center">
                <select bind:value={selectedModel} class="border p-1.5 px-5 rounded-lg hover:bg-gray-50 transition-all duration-300">
                    {#each models as model}
                        <option value={model.value}>{model.name}</option>
                    {/each}
                </select>
                <button on:click={() => goto("/profile")} class="border p-1.5 px-5 rounded-lg ml-3 hover:bg-gray-50 transition-all duration-300">
                    <i class="ri-user-line"></i> Profile
                </button>
                <button on:click={clickLogout} class="border p-1.5 px-5 rounded-lg ml-3 cursor-pointer hover:bg-gray-50 transition-all duration-300"><i class="ri-logout-box-r-line"></i> Log out</button>
            </div>
            <div class="md:hidden relative">
                <button on:click={toggleDropdown} class="border p-1.5 px-5 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm">
                    <i class="ri-menu-line"></i>
                </button>
                {#if dropdownOpen}
                <div class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 p-2">
                    <select bind:value={selectedModel} class="border p-1.5 px-5 w-full border-none hover:bg-gray-50 transition-all duration-300">
                        {#each models as model}
                            <option value={model.value}>{model.name}</option>
                        {/each}
                    </select>
                    <button on:click={() => goto("/profile")} class="border-t p-1.5 px-5 w-full text-left hover:bg-gray-50 transition-all duration-300">
                        <i class="ri-user-line"></i> Profile
                    </button>
                    <button on:click={clickLogout} class="border-t p-1.5 px-5 w-full text-left hover:bg-gray-50 transition-all duration-300"><i class="ri-logout-box-r-line"></i> Log out</button>
                </div>
                {/if}
            </div>
        </div>
        <p class="text-sm">Welcome, {user.username}!</p>
        <form class="mt-3" on:submit|preventDefault={chat}>
            <div class="flex items-center">
                <input type="text" bind:value={prompt} placeholder="Talk to Brainman" class="border w-full p-1.5 px-5 rounded-lg" />
                {#if !loading}
                <button type="submit" class="border border-[#0676ff] p-1.5 px-5 rounded-lg ml-3 bg-[#0676ff] text-white" style="opacity: {prompt ? 1 : 0.2}" disabled={!prompt}>
                    <i class="ri-send-plane-2-line"></i>
                </button>
                {:else}
                <button disabled type="submit" class="border border-[#0676ff] p-1.5 px-5 rounded-lg ml-3 bg-[#0676ff] text-white opacity-50">
                    <i class="ri-refresh-line animate-spin"></i>
                </button>
                {/if}
            </div>
        </form>
    </div>
    {#if loading}
        <div class="mt-5">
            <p class="text-sm">Please wait while Brainman processes your request...</p>
        </div>
    {/if}
    {#if data}
        <div class="mt-5">
            <p class="text-base">Brainman:</p>
        </div>
        {#if textData}
            <div class="mt-2 text-sm">
                <p>{textData}</p>
            </div>
        {/if}
        {#if codeData}
            <div class="mt-2 text-sm">
                <CodeBlock code={codeData} language="{language}" />
            </div>
        {/if}
    {/if}
</div>

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
