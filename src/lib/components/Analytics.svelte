<script>
    import { page } from '$app/stores'

    export let g_tag
    export let title
  
    $: {
      if (typeof gtag !== 'undefined') {
        //gtag('config', 'G-93DF5QFH8K', {
        gtag('config', g_tag, {
          page_title: title,
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
  <svelte:head>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id={g_tag}">
    </script>
    <script>
      window.dataLayer = window.dataLayer || []
  
      function gtag() {
        dataLayer.push(arguments)
      }
  
      gtag('js', new Date())
      gtag('config', {g_tag})
    </script>
  </svelte:head>