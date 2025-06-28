<div class="container-fluid">
  <div class="row border-bottom mb-3">
    <div class="col-12 col-md-9">
      {#await data.main then main}
      {#if main.content}
      {@html main.content}
      {/if}
      {/await}
    </div>
    <div class="col-md-3 p-2 text-end">
      <button class="btn btn-primary subscribe-button-pl">Zapisz się do newslettera</button>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      {#await data.first then first}
      {@html first.content}
      {/await}
    </div>
  </div>
</div>
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