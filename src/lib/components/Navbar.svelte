<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { dev } from '$app/environment';
    import { hcms } from '$lib/hcms.js';
    import { env } from '$env/dynamic/public';

    const dispatch = createEventDispatcher();

    export let languages;
    export let language;
    export let defaultLanguage;
    export let data;

    let defaultNavlist =
    {
        "title": "EXPERIOT",
        "logo": "logo.svg",
        "elements": [
             { url: { pl: "pl", en: "en" }, label: { en: "Home", pl: "Home" }, target: "" }/*,
            { url: { pl: "pl/about", en: "en/about" }, label: { en: "About", pl: "O nas" }, target: "" },
            { url: { pl: "pl/services", en: "en/services" }, label: { en: "Services", pl: "Usługi" }, target: "" },
            { url: { pl: "pl/contact", en: "en/contact" }, label: { en: "Contact", pl: "Kontakt" }, target: "" } 
*/
        ]
    };

    let navlist = defaultNavlist;
    onMount(async () => {
        navlist = JSON.parse(data.content);
        document.title = navlist.title;
    });

    function handleLang(x) {
        dispatch('setLanguage', {
            language: x
        })
    }

</script>
<nav class="navbar navbar-expand-md navbar-light bg-light mb-2">
    <div class="container-fluid">
        <a class="navbar-brand fs-4" href="#">{navlist.title}</a>
        <!-- <img class="navbar-brand" src="{navlist.logo}" alt="logo" style="height:3rem;"> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                {#each navlist.elements as element}
                <li class="nav-item">
                    <a class="nav-link" href={element.url[language]}
                        target={element.target}>{element.label[language]}</a>
                </li>
                {/each}

                <!--           <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li> -->
            </ul>
            {#if languages.length>1}
            <form class="d-flex">
                {#each languages as lang}
                {#if lang!==language}
                <label><img class="flag" alt={lang} src={'/flags/'+lang+'.svg'} on:click={()=>
                    handleLang(lang)}></label>
                {/if}
                {/each}
            </form>
            {/if}
        </div>
    </div>
</nav>

<style>
    nav img {
        width: 125px;
    }

    a.nav-item {
        font-size: large;
    }

    .flag {
        width: 1.6rem;
        border-width: 1px;
        border-color: lightgray;
        border-style: solid;
    }
</style>