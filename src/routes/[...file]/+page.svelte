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
                {@html result.content}
                {:catch error}
                {error.message}
                {/await}
    </div>
</div>
<script>
    export let data
</script>