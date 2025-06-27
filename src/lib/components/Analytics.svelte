<script>
  import { page } from '$app/stores'

  export let g_tag
  export let title

  let consent = false

  // Sprawdź zgodę po stronie klienta
  if (typeof window !== 'undefined') {
    consent = localStorage.getItem("sgxCookieConsent") === "accepted"
  }

  $: if (consent && typeof gtag !== 'undefined') {
    gtag('config', g_tag, {
      page_title: title,
      page_path: $page.url.pathname,
    })
  }
</script>


<svelte:head>
  {#if consent}
  <script async src="https://www.googletagmanager.com/gtag/js?id={g_tag}">
  </script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '{g_tag}');
  </script>
  {/if}
</svelte:head>