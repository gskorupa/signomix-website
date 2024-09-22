<script>
    import { onMount } from 'svelte';
    import { language } from '$lib/language.js';
    import { invalidateAll } from '$app/navigation';
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { env } from '$env/dynamic/public';

    //let languages = ['en', 'pl'];
    let languages = env.PUBLIC_HCMS_LANGUAGES;
    let pageLanguage = env.PUBLIC_HCMS_LANGUAGE;
    let defaultLanguage = env.PUBLIC_HCMS_LANGUAGE;
    let websiteRoot = env.PUBLIC_HCMS_ROOT;
    let devModePort = 5000;
    let devMode = false;
    let path;
    let homePath;
    let langArray = [];

    export let data;

    // child components which must be binded
    let navbar;
    let footer;


    onMount(async () => {
        try {
            langArray = languages.split(',');
        } catch (e) {
            console.log('error parsing languages ' + languages, e)
        }
        let originalLocation = document.location.pathname;
        path = document.location.pathname
        if (path == '' || path == '/') {
            path = '/' + defaultLanguage + '/';
            pageLanguage = defaultLanguage
        } else {
            pageLanguage = getLanguageFromPath(path)
        }
        if (!langArray.includes(pageLanguage)) {
            pageLanguage = defaultLanguage
            path = '/' + defaultLanguage + '/'
        }
        language.set(pageLanguage)
        if (originalLocation != path) {
            document.location.pathname = path
        }
        devMode = window.origin.endsWith(':' + devModePort);
        /*
        //TODO: redirecting to https should be done in standalone mode (running without proxy server)
        if (!devMode && !window.location.hostname.includes('localhost') && window.location.protocol !== "https:") {
                    window.location.protocol = "https:";
                } */
        homePath = getRoot(path);
    });

    function getLanguageFromPath(pathName) {
        let idx
        let result = ''
        if (pathName == '' || pathName == '/') {
            return defaultLanguage
        }
        idx = pathName.indexOf('/', 1)
        if (idx > -1) {
            result = pathName.substring(1, idx)
        } else {
            result = pathName.substring(1)
        }
        return result
    }

    function getRoot(pathName) {
        return '/'
    }
    function handleSetLanguage(event) {
        language.set(event.detail.language)
        pageLanguage = event.detail.language
        let actualLanguage = getLanguageFromPath(document.location.pathname)
        let actualLocation = document.location.pathname
        if (!actualLocation.startsWith('/' + pageLanguage)) {
            let newLocation = actualLocation.replace('/' + actualLanguage, '/' + pageLanguage)
            document.location.pathname = newLocation
        }
    }
    function trimWebsiteRoot(path) {
        return path.substring(websiteRoot.length + 1)
    }
    function printlog(data) {
        //console.log('blog posts (layout)', data)
        return ''
    }   
</script>
{#await data then data}
<div class="row mt-4 gx-1">
    <div class="col-md-9 mb-2 ">
        <div class="border rounded-2 p-2 m-1">
            <slot></slot>
        </div>
    </div>
    <div class="col-md-3 mb-2 ">
        <div class="border rounded-2 p-2 m-1">
        {printlog(data.posts)}
        {#await data.posts.documents}
        <div>loading...</div>
        {:then link}
        {#each link as post}
        {#if post.metadata.language == undefined || post.metadata.language == null}
        <div>
            <b><a href="{trimWebsiteRoot(post.name)}">{post.metadata.title}</a></b><br>
            <i>{post.metadata.published}</i>
        </div>
        {/if}
        {/each}
        {:catch error}
        <div>{error.message}</div>
        {/await}
        </div>
    </div>
</div>
{:catch error}
<ErrorMessage content={error.message} />
{/await}