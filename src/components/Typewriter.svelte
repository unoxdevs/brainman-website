<script lang="ts">
    import { onMount } from 'svelte';

    export let text: string;
    export let speed: number = 50;
    
    let displayText = '';
    
    onMount(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                displayText += text[index];
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    });
</script>

<span class="inline-block">{displayText}</span>