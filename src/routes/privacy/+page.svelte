<script>
    import Footer from "../../components/Footer.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="p-7 md:px-10 lg:px-10 max-w-[100rem] min-h-screen mx-auto my-5 rounded-xl bg-white">
    <h1 class="text-xl md:text-2xl lg:text-2xl font-semibold">Privacy Policy</h1>
    <p class="mt-2 text-xs">Latest Updated: April 24, 2024</p>
    <div class="mt-10">
        <h1 class="text-xl font-semibold">Introduction</h1>
        <p class="mt-2 text-sm">Protecting user privacy is one of the foremost commitments of this app. This Privacy Policy provides a detailed description of how the app collects, uses, stores and protects user data.</p>
        <p class="mt-2 text-sm">By using this app, you agree to the collection, use, storage and disclosure of your data in accordance with this Privacy Policy.</p>

        <div class="mt-10">
            <h1 class="text-xl font-semibold">Data Collection</h1>
            <p class="mt-2 text-base">User Information</p>
            <p class="mt-2 text-sm">When registering or logging in to the App, you will be asked to provide personal information such as name, email address and password. This information is used for authentication and account management purposes. The information you provide is stored securely and is only used to communicate about account management.</p>
            <br>
            <p class="mt-2 text-base">User Added Data</p>
            <p class="mt-2 text-sm">Our app allows users to add, edit and share content. This data may be text, images, videos or other types of content. We store this data only to serve its designated purpose and implement strong security measures to protect it from unauthorized access.</p>
            <br>
            <p class="mt-2 text-base">Data Usage</p>
            <p class="mt-2 text-sm">We only use user data for the following purposes:</p>
            <ul>
                <li class="mt-2 text-sm">• Authentication: The information you provide is used for authentication purposes to access your account.</li>
                <li class="mt-2 text-sm">• Account Management: We may use your email address to contact you for account management operations such as signing up, resetting passwords or updating account settings.</li>
                <li class="mt-2 text-sm">• Communication: We may use your contact information to respond to your questions or comments or to send you important updates about our services.</li>
                <li class="mt-2 text-sm">• Development and Analytics: We may analyze data to improve the App and enhance the user experience. This may mean tracking usage trends, detecting bugs and developing new features.</li>
            </ul>
            <br>
            <p class="mt-2 text-base">Data Security</p>
            <p class="mt-2 text-sm">We implement strong security measures to ensure the safety of user data. These include encryption, secure data storage and regular security assessments. We have strict procedures in place to prevent unauthorized access and are constantly working to protect the integrity of your data.</p>
            <br>
            <p class="mt-2 text-base">Third Party Services</p>
            <p class="mt-2 text-sm">In some cases, we may use third party service providers to process your data. These services may include tasks such as cloud storage, analytics or sending emails. We make sure that our third-party service providers have privacy policies and are committed to ensuring that your data is secure and confidential.</p>
            <br>
            <p class="mt-2 text-base">User Rights</p>
            <p class="mt-2 text-sm">As a user, you have certain rights over your data:</p>
            <ul>
                <li class="mt-2 text-sm">• Access: You have the right to access and obtain a copy of your personal data.</li>
                <li class="mt-2 text-sm">• Correction: You have the right to correct or update your personal data to ensure that it is accurate and up-to-date.</li>
                <li class="mt-2 text-sm">• Deletion: You have the right to request erasure of your personal data. Please note that this may include deleting your account completely.</li>
                <li class="mt-2 text-sm">• Objection: You have the right to object to certain uses of your personal data, for example for direct marketing purposes.</li>
                <li class="mt-2 text-sm">• Restriction: You have the right to ask us to restrict the processing of your personal data, for example if you dispute the accuracy of your data.</li>
                <li class="mt-2 text-sm">• Portability: You have the right to receive your personal data in a structured, commonly used and machine-readable format and to transfer it to another data controller.</li>
            </ul>
            <br>
            <p class="mt-2 text-base">Changes</p>
            <p class="mt-2 text-sm">Our Privacy Policy is updated and amended from time to time. If we make any changes, we will post those updates here and notify you where necessary.</p>
            <br>
            <p class="mt-2 text-base">Contact Us</p>
            <p class="mt-2 text-sm">Please feel free to contact us if you have questions or concerns about our privacy practices. For your contact information and privacy-related questions, please use the contact information below: <br><br> Email: <a href="mailto:privacy@unoxdevs.fun" class="text-sm font-bold">privacy@unoxdevs.fun</a> <br><br> This Privacy Policy demonstrates our commitment to the secure and responsible handling of user data. We continually strive to demonstrate our commitment to protecting user privacy.</p>
        </div>
        <button on:click={() => goto("/dashboard")} class="border p-1.5 px-5 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300 mt-5"><i class="ri-dashboard-line"></i> Go to Dashboard</button>
    </div>
</div>

<Footer />