<div id="cookie-banner"
    style="position:fixed;bottom:0;left:0;width:100%;background:#f8f9fa;border-top:1px solid #ccc;padding:16px;z-index:1000;display:none;">
    <div class="row">
        <div class="col-md-10">
            Strony serwisu signomix.com używają plików cookies w celach technicznych (niezbędnych do działania tych
            stron)
            oraz statystycznych (umożliwiających nam zbieranie anonimowych danych o ruchu na stronach).<br>
            Możesz zaakceptować lub odrzucić pliki cookies, które nie są niezbędne do działania strony.<br>
            <a href="https://documentation.signomix.com/pl/legal/terms_and_conditions.md" target="_blank">Dowiedz się
                więcej</a>.
        </div>
        <div class="col-md-2 text-end">
            <button id="cookie-accept" class="btn btn-success btn-sm ms-2 m-2">Akceptuję</button>
            <button id="cookie-reject" class="btn btn-secondary btn-sm ms-2 m-2">Odrzucam</button>
        </div>
    </div>
</div>
<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    onMount(() => {
        if (browser) {
            document.addEventListener("DOMContentLoaded", function () {
                // Sprawdź, czy użytkownik już podjął decyzję
                if (!localStorage.getItem("cookieConsent")) {
                    document.getElementById("cookie-banner").style.display = "block";
                }

                document.getElementById("cookie-accept").onclick = function () {
                    localStorage.setItem("cookieConsent", "accepted");
                    document.getElementById("cookie-banner").style.display = "none";
                    // tutaj możesz dodać kod inicjujący cookies/statystyki
                };

                document.getElementById("cookie-reject").onclick = function () {
                    localStorage.setItem("cookieConsent", "rejected");
                    document.getElementById("cookie-banner").style.display = "none";
                    // tutaj możesz dodać kod blokujący cookies/statystyki
                };
            });
        }
    });
</script>