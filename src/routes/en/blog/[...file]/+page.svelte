{#await data}
<span class="sr-only">Loading...</span>
{:then data}
{@html data.content}
{:catch error}
{error.message}
{/await}
<script>
    import { language } from '$lib/language.js';
    export let data

    let previousLanguage = language

    $: if (previousLanguage !== language) {
        invalidateAll()
        previousLanguage = language
    }
    function printData(data) {
        //console.log('blog post (page)', data)
        return ''
    }
</script>