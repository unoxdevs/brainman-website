<script>
    import "../app.css";
</script>

<slot />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

    :global(body) {
        font-family: 'Outfit', sans-serif;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background-color: #111111;
        color: rgba(255, 255, 255, 0.67);
    }
</style>