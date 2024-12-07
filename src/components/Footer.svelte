<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="w-full backdrop-blur-md border-t bg-white/[0.03] border-white/5 py-4 mt-auto">
    <div class="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <span class="text-white/50 text-sm">Brainman</span>
        <p class="text-white/50 text-sm hidden sm:block"> {currentYear} UnoxDevs. All rights reserved.</p>
        <div class="flex items-center gap-6">
            <a href="https://github.com/unoxdevs/brainman" target="_blank" rel="noopener noreferrer" class="text-white/50 hover:text-white transition-colors duration-200">
                <i class="ri-github-fill text-xl"></i>
            </a>
            <a href="https://www.npmjs.com/package/brainman" target="_blank" rel="noopener noreferrer" class="text-white/50 hover:text-white transition-colors duration-200">
                <i class="ri-npmjs-fill text-xl"></i>
            </a>
        </div>
    </div>
    <p class="text-white/50 text-sm text-center mt-3 sm:hidden"> {currentYear} UnoxDevs. All rights reserved.</p>
</footer>