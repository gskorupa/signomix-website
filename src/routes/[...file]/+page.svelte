<!-- breadcrumbs
    <div class="row container-fluid">
    <div class="col mb-2">
        {#await data}
        ...
        {:then data}
        {#if data.paths!=undefined && data.paths!=null && data.paths.length>0}
        {#each data.paths as pathelem, index}
        <a href={pathelem.path}>{pathelem.name==''?'home':pathelem.name}</a> {data.paths.length-1>index?' / ':''}
        {/each}
        {/if}
        {/await}
    </div>
</div>
-->
<div class="row mt-3">
    <div class="col">
                {#await data}
                ...
                {:then result}
                {#if result!=undefined && result!=null && result.documents!=null && result.documents!=undefined && result.documents.length>0}
                {@html result.documents[0].content}
                {:else}
                <h1>404</h1>
                <p>Page not found.</p>
                {/if}
                {:catch error}
                {error.message}
                {/await}
    </div>
</div>
<script>
    export let data
</script>