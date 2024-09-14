<script>
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';

    export let content;

    onMount(async () => {
        try {
            if (!dev) {
                content = document.content
            }else{
                content = '<span class="fs-6">dev error</span>';
            }
        } catch (e) {
            console.log(e)
        }
    });

</script>
<div class='container-fluid border-top mt-2'>
    <div class="row">
        <div class="col-12">
        {@html content}
        </div>
    </div>
</div>
<style>
    .ft {
        padding: 1.5rem;
        color: black;
    }
</style>