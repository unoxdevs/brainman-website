<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import db from "$lib/pocketbase";
    import toast, { Toaster } from 'svelte-french-toast';
    import loginUser from "$lib/loginUser";
    import { goto } from "$app/navigation";

    let isValid = db.authStore.isValid;
    let email = "";
    let password = "";
    let countdown = 5;
    let loading = false;

    function signIn() {
        try {
            loading = true;
            loginUser(email, password).then(() => {
                loading = false;
                if (typeof window !== 'undefined') {
                    goto('/dashboard');
                }
            }).catch(() => {
                toast.error("Invalid email or password");
                loading = false;
            });
        } catch (error) {
            toast.error("Invalid email or password");
            loading = false;
        }
    }

    if (isValid == true) {
        if (typeof window !== 'undefined') {
            const interval = setInterval(() => {
                if (countdown > 0) {
                    countdown--;
                } else {
                    clearInterval(interval);
                    goto('/dashboard');
                }
            }, 1000);
        }
    }
</script>

{#if isValid == true}
<div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-80">
        <p class="text-sm text-center py-2 font-medium mb-2 bg-[#289aff] text-white">You are already signed in!</p>
        <h1 class="uppercase text-6xl font-semibold text-center bg-[#b9e4ff] py-2 text-[#289aff]">Error</h1>
        <div class="mt-2 text-center text-sm">
            <button on:click={() => window.location.href = "/dashboard"} class="p-2 px-3 w-full bg-[#289aff] text-white">Go to Dashboard (in {countdown})</button>
        </div>
    </div>
</div>
{:else}
<Navbar />
<Toaster />
<div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-96 bg-white rounded-lg px-5 py-10">
        <h1 class="uppercase text-2xl font-semibold text-center">Sign in for Brainman</h1>
        <p class="text-sm mt-2 text-center">Log in to your awesome account.</p>
        <form on:submit|preventDefault>
            <div class="mt-4">
                <label for="email" class="block text-sm font-normal">
                    Email
                </label>
                <input bind:value={email} type="email" id="email" placeholder="Enter your email" class="p-1.5 px-3 w-full bg-transparent border rounded-lg placeholder:text-sm focus:outline-none" />
            </div>
            <div class="mt-4">
                <label for="password" class="block text-sm font-normal">
                    Password
                </label>
                <input bind:value={password} type="password" id="password" placeholder="Enter your password" class="p-1.5 px-3 w-full bg-transparent border rounded-lg placeholder:text-sm focus:outline-none" />
            </div>
            <div class="mt-4 text-center">
                <button on:click={signIn} class="p-1.5 px-3 w-full bg-[#0676ff] rounded-lg text-white" style="opacity: {email && password ? 1 : 0.5}" disabled={!email || !password}>{loading ? 'Loading...' : 'Sign In'}</button>
                <p class="mt-4 text-xs">Don't have an account? <a href="/signup" class="text-[#0676ff]">Sign Up</a></p>
            </div>
        </form>
    </div>
</div>
{/if}
