<script>
    import db from "$lib/pocketbase";
    import toast, { Toaster } from 'svelte-french-toast';
    import registerUser from "$lib/registerUser";
    import { goto } from "$app/navigation";
    import Navbar from "../../components/Navbar.svelte";

    let isValid = db.authStore.isValid;
    let name = "";
    let email = "";
    let password = "";
    let rePassword = "";
    let countdown = 5;
    let loading = false;

    function signUp() {
        if (password !== rePassword) {
            alert("Passwords do not match!");
            return;
        }
        
        if (password.length < 8 || password.length > 32) {
            alert("Password must be between 8 and 32 characters long!");
            return;
        }

        loading = true;
        registerUser(name, email, password, rePassword).then(() => {
            loading = false;
            if (typeof window !== 'undefined') {
                goto('/dashboard');
            }
        })
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
        <p class="text-sm text-center py-2 font-medium mb-2 bg-[#ae5520] text-[#fdf8ef]">You are already signed in!</p>
        <h1 class="uppercase text-6xl font-semibold text-center bg-[#d16f25] py-2 text-[#fdf8ef]">Error</h1>
        <div class="mt-2 text-center text-sm">
            <button on:click={() => window.location.href = "/dashboard"} class="p-2 px-3 w-full bg-[#ae5520] text-white">Go to Dashboard (in {countdown})</button>
        </div>
    </div>
</div>
{:else}
<Toaster />
<Navbar />
<div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-96 bg-white rounded-lg px-5 py-10">
        <h1 class="uppercase text-2xl font-semibold text-center">Sign up for Brainman</h1>
        <p class="text-sm mt-2 text-center">Sign up for a free account</p>
        <form on:submit|preventDefault>
            <div class="mt-4">
                <label for="username" class="block text-sm font-normal">
                    Username
                </label>
                <input bind:value={name} type="text" id="username" placeholder="Enter your username" class="p-1.5 px-3 w-full bg-transparent border rounded-lg placeholder:text-sm focus:outline-none" />
            </div>
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
            <div class="mt-4">
                <label for="password" class="block text-sm font-normal">
                    Re-enter password
                </label>
                <input bind:value={rePassword} type="password" id="rePassword" placeholder="Re-enter your password" class="p-1.5 px-3 w-full bg-transparent border rounded-lg placeholder:text-sm focus:outline-none" />
            </div>
            {#if password !== rePassword}
                <p class="mt-4 text-red-600 text-xs"><i class="ri-error-warning-line"></i> Passwords do not match!</p>
            {/if}
            <div class="mt-4 text-center">
                <button on:click={signUp} class="p-1.5 px-3 w-full bg-[#0676ff] rounded-lg text-white" style="opacity: {email && password ? 1 : 0.5}" disabled={!email || !password}>{loading ? 'Loading...' : 'Sign Up'}</button>
                <p class="mt-4 text-xs">Already have an account? <a href="/" class="text-[#0676ff]">Login</a></p>
            </div>
        </form>
    </div>
</div>
{/if}