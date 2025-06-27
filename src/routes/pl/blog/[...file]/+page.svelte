{#await data.main then main}
{#if main.content}
{@html main.content}
{/if}
{/await}
{#await data.first then first}
{@html first.content}
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