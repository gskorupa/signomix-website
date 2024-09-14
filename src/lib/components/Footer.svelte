<script>
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';

    export let document;

    let content = '<span class="fs-6">&copy; 2024 Experiot</span>';

    onMount(async () => {
        try {
            if (!dev) {
                content = document.content
            }
        } catch (e) {
            //console.log('error loading footer')
            console.log(e)
        }
    });

</script>
<div class='container-fluid border-top mt-3'>
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