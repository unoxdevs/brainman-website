<script>
    import Footer from "../../components/Footer.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="p-7 md:px-10 lg:px-10 max-w-[100rem] min-h-screen mx-auto my-5 rounded-xl bg-white">
    <h1 class="text-xl md:text-2xl lg:text-2xl font-semibold">About Us</h1>
    <p class="mt-2 text-sm">Brainman is an advanced AI assistant designed to make your daily life easier and increase your productivity. Our goal is to provide an intuitive and user-friendly platform to enable users to access information, manage tasks and organize their daily lives more efficiently.</p>
    <div class="mt-10">
        <h1 class="text-xl font-semibold">Our Vision</h1>
        <p class="mt-2 text-sm">Our goal is to make Brainman accessible and useful for everyone and enable people to benefit from AI technology in their daily lives. We are constantly improving Brainman and adding new features so that users have an assistant that is always there to meet their needs and further improve their digital lives.</p>
        <p class="mt-2 text-sm"><a href="https://www.npmjs.com/package/brainman" class="font-bold">Download Brainman</a> today to experience Brainman and boost your productivity. Enjoy your AI assistant and make your digital life more efficient and fun!</p>
        <br>
        <h1 class="text-xl font-semibold">Our Mission</h1>
        <p class="mt-2 text-sm">Our mission is to transform the way people interact with technology and bring the power of AI to everyone's benefit. With Brainman, we aim to help people manage everyday tasks more efficiently, save time and enrich their lives. Our vision is to make AI technology accessible and useful for everyone and help people improve their digital lives.</p>
        <br>
        <h1 class="text-xl font-semibold">Our Team</h1>
        <p class="mt-2 text-sm">Our team is composed of passionate developers and designers who are dedicated to creating innovative and user-friendly products. We are committed to providing the best user experience and constantly improving Brainman to meet the needs of our users.</p>
        <ul>
            <li class="mt-2 text-sm">Web Developer: <a href="https://github.com/Queaxtra" class="font-bold">Queaxtra</a></li>
            <li class="mt-2 text-sm">Backend Developer: <a href="https://github.com/UnoxDevs" class="font-bold">Queaxtra</a> & <a href="https://discord.com/users/831903326748540928" class="font-bold">Axeos</a></li>
            <li class="mt-2 text-sm">Designer: <a href="https://github.com/UnoxDevs" class="font-bold">Queaxtra</a></li>
        </ul>
        <br>
        <h1 class="text-xl font-semibold">Contact Us</h1>
        <p class="mt-2 text-sm">If you have any questions or suggestions, please don't hesitate to contact us. We are here to help and answer any questions you may have.</p>
        <ul>
            <li class="mt-2 text-sm">Email: <a href="mailto:brainman@unoxdevs.fun" class="font-bold">brainman@unoxdevs.fun</a></li>
            <li class="mt-2 text-sm">Discord: <a href="https://discord.gg/nMqc9zrT" class="font-bold">https://discord.gg/nMqc9zrT</a></li>
            <li class="mt-2 text-sm">Website: <a href="https://unoxdevs.fun" class="font-bold">https://unoxdevs.fun</a></li>
            <li class="mt-2 text-sm">GitHub: <a href="https://github.com/UnoxDevs" class="font-bold">https://github.com/UnoxDevs</a></li>
            <li class="mt-2 text-sm">Twitter: <a href="https://twitter.com/UnoxDevs" class="font-bold">https://twitter.com/UnoxDevs</a></li>
            <li class="mt-2 text-sm">LinkedIn: <a href="https://www.linkedin.com/company/unoxdevs/" class="font-bold">https://www.linkedin.com/company/unoxdevs/</a></li>
            <li class="mt-2 text-sm">Instagram: <a href="https://www.instagram.com/unoxdevs/" class="font-bold">https://www.instagram.com/unoxdevs/</a></li>
            <li class="mt-2 text-sm">Telegram: <a href="https://t.me/UnoxDevs" class="font-bold">https://t.me/UnoxDevs</a></li>
        </ul>
        <button on:click={() => goto("/dashboard")} class="border p-1.5 px-5 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300 mt-5"><i class="ri-dashboard-line"></i> Go to Dashboard</button>
    </div>
</div>

<Footer />