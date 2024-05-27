<script>
    import Footer from "../../components/Footer.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="p-7 md:px-10 lg:px-10 max-w-[100rem] min-h-screen mx-auto my-5 rounded-xl bg-white">
    <h1 class="text-xl md:text-2xl lg:text-2xl font-semibold">Terms of Service</h1>
    <p class="mt-2 text-xs">Latest Updated: April 24, 2024</p>
    <p class="mt-2 text-sm">These Terms of Service set forth the terms and conditions for your use of the Brainman application ("App") and related services ("Services"). Please read these Terms of Service carefully, as by using the App and Services, you agree to these terms.</p>
    <div class="mt-10">
        <div class="mt-10">
            <h1 class="text-xl font-semibold">Account Creation and Registration</h1>
            <ul>
                <li class="mt-2 text-sm">• To use the app you need to create an account and register.</li>
                <li class="mt-2 text-sm">• You must provide accurate and complete information during registration.</li>
                <li class="mt-2 text-sm">• You are responsible for maintaining the security of your account. Notify us immediately in case of any unauthorized use of your account.</li>
            </ul>
            <br>
            <h1 class="text-xl font-semibold">User Content</h1>
            <ul>
                <li class="mt-2 text-sm">• You are responsible for all content that you submit, upload, post or otherwise provide on the App or through the Services ("User Content").</li>
                <li class="mt-2 text-sm">• We do not warrant that User Content is accurate, legal, non-infringing, or non-harmful.</li>
                <li class="mt-2 text-sm">• We reserve the right to remove or modify User Content that we deem inappropriate, abusive, harassing, hate speech, copyrighted, illegal or otherwise unacceptable.</li>
                <li class="mt-2 text-sm">• You remain the owner of your User Content without express permission from you to share, copy, distribute, transmit or otherwise use your User Content.</li>
            </ul>
            <br>
            <h1 class="text-xl font-semibold">Code of Conduct</h1>
            <p class="mt-2 text-sm">You agree to abide by the following rules of conduct when using the App and Services:</p>
            <ul>
                <li class="mt-2 text-sm">• You will not use the App or Services to violate any law or regulation.</li>
                <li class="mt-2 text-sm">• You will not take any action that could disrupt, damage or render unusable access to the App or Services.</li>
                <li class="mt-2 text-sm">• You will not post, upload or transmit viruses, malware or other harmful code on the App or Services.</li>
                <li class="mt-2 text-sm">• You will not engage in any conduct on the App or Services that may annoy, harass, threaten, humiliate or annoy other users.</li>
                <li class="mt-2 text-sm">• You will not post or transmit any advertising, promotional material, "junk mail," "spam," "chain letters," or other unsolicited commercial content on the App or Services.</li>
            </ul>
            <br>
            <h1 class="text-xl font-semibold">Copyright and Intellectual Property</h1>
            <ul>
                <li class="mt-2 text-sm">• The App and Services, including logos, brands, visual interfaces, special characters and all related content, are protected by copyright, trademark and other intellectual property laws.</li>
                <li class="mt-2 text-sm">• You will not reproduce, distribute, make available to the public or create derivative works of any content that you may access through the App or Services without our permission.</li>
                <li class="mt-2 text-sm">• You will not remove or modify any content, copyright notices or other proprietary notices that you may access through the App or Services.</li>
            </ul>
        </div>
        <button on:click={() => goto("/dashboard")} class="border p-1.5 px-5 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300 mt-5"><i class="ri-dashboard-line"></i> Go to Dashboard</button>
    </div>
</div>

<Footer />