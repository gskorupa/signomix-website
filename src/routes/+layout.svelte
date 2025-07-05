<script>
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import Analytics from "$lib/components/Analytics.svelte";
    import CookieBanner from "$lib/components/CookieBanner.svelte";
    import { browser } from '$app/environment';

    export let data;

    function isBlog(pathname) {
        console.log("isBlog", pathname);
        return pathname.includes("blog");
    }
    function isPlVersion(pathname) {
        console.log("isPlVersion", pathname);
        return pathname.includes("/pl/") || pathname == "/";
    }
    
</script>

{#await data then data}
{#if data.gtag != undefined && data.gtag != null && data.gtag != ""}
<Analytics g_tag={data.gtag} title="Signomix home" />
{/if}
{/await}

<div class="container-fluid pe-0" style="background-color: #0d6efd;">
    <!--#1849cf-->
    <!--
        <a class="navbar-brand ms-2" href="#">
            <img src="/logo-light.svg" alt="Logo" height="36" class="d-inline-block my-auto me-2">
            <span class="h3 my-auto" style="color: rgb(223, 223, 223);">Signomix</span>
        </a>
        -->
    <div class="row w-100">
        <div class="col h3 my-auto py-2">
            <img src="/logo-light.svg" alt="Logo" height="36" class="d-none d-sm-inline" />
            {#if isBlog($page.url.pathname)}
            <span style="color: rgb(255, 255, 255);">Signomix blog</span>
            {:else}
            <span style="color: rgb(255, 255, 255);">Signomix</span>
            {/if}
        </div>
        <div class="col my-auto" style="color: rgb(255, 255, 255);">
            <div class="h-100 my-auto">
                {#if isPlVersion($page.url.pathname)}
                <a href="/pl/index.html" class="link-light underline-opacity-0 underline-opacity-hover-0">
                    Home
                </a>
                <a href="/pl/blog/index.md" class="link-light underline-opacity-0 underline-opacity-hover-0 ms-2">
                    Blog
                </a>
                <a href="https://documentation.signomix.com/pl/index.md" class="link-light underline-opacity-0 underline-opacity-hover-0 ms-2" target="_blank">
                    Dokumentacja
                </a>
                {:else}
                <a href="/en/index.html" class="link-light underline-opacity-0 underline-opacity-hover-0">
                    Home
                </a>
                <a href="/en/blog/index.md" class="link-light underline-opacity-0 underline-opacity-hover-0 ms-2">
                    Blog
                </a>
                <a href="https://documentation.signomix.com/en/index.md" class="link-light underline-opacity-0 underline-opacity-hover-0 ms-2" target="_blank">
                    Documentation
                </a>
                {/if}
            </div>
        </div>
        <div class="col text-end my-auto" style="color: rgb(255, 255, 255);">
            {#if isBlog($page.url.pathname)}
            <a href="/pl/blog/index.md" class="link-light underline-opacity-0 underline-opacity-hover-0">
                <img src="/flags/4x3/pl.svg" height="16px" title="polski" />
            </a>
            <a href="/en/blog/index.md" class="link-light underline-opacity-0 underline-opacity-hover-0 ms-2">
                <img src="/flags/4x3/gb.svg" height="16px" title="english" />
            </a>
            {:else}
            <a href="/pl/index.html" class="link-light underline-opacity-0 underline-opacity-hover-0">
                <img src="/flags/4x3/pl.svg" height="16px" title="polski" />
            </a>
            <a href="/en/index.html" class="link-light underline-opacity-0 underline-opacity-hover-0 ms-2">
                <img src="/flags/4x3/gb.svg" height="16px" title="english" />
            </a>
            {/if}
        </div>
    </div>
</div>
<div class="container-fluid">
    <slot></slot>
</div>
<div class="container-fluid">
    <footer class="py-2 my-3 border-top">
        <div class="row">
            <div class="col text-start">
                <span class="fs-6 ms-2">&copy; 2025 Experiot</span>
            </div>
            <div class="col  text-center">
                <a href="mailto:signomix@experiot.pl"><i class="bi bi-envelope-at h5 mx-1"></i></a>
                <a href="https://discord.gg/ATMKpZyePm"><i class="bi bi-discord h5 mx-1"></i></a>
                <a href="https://x.com/SignomixIoT"><i class="bi bi-twitter-x h5 mx-1"></i></a>
                <a href="https://github.com/signomix"><i class="bi bi-github h5 mx-1"></i></a>
                <a href="https://www.linkedin.com/company/experiot"><i class="bi bi-linkedin h5 mx-1"></i></a>
            </div>
            <div class="col text-end">
                {#if isPlVersion($page.url.pathname)}
                <span class="fs-6 me-2"><a href="https://documentation.signomix.com/pl/legal/terms_and_conditions.md" target="_blank">Warunki i prywatność</a></span>
                {:else}
                <span class="fs-6 me-2"><a href="https://documentation.signomix.com/en/legal/terms_and_conditions.md" target="_blank">Terms & Privacy</a></span>
                {/if}
            </div>
        </div>
    </footer>
</div>
<CookieBanner language={isPlVersion($page.url.pathname)?'pl':'en'} />