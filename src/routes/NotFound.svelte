<script>
	import Link from "../components/Link.svelte";
	import { Navigate } from "../Router";

</script>
<div class="not-found">
    <div class="text">
        <h1>404 - Page Not Found</h1>

        <div class="left-align">
            <br>[Page-Chan] <b><i>*looks around confusedly*</i></b>
            <br>[Page-Chan] <b><i>*Where am I...?*</i></b>
            <br>[Page-Chan] <b><i>*sighs*</i></b>
            <br>[Page-Chan] I guess this page doesn't exist...

            <br>
            <br>[User-Chan] <b><i>*looks at Page-Chan*</i></b>
            <br>[User-Chan] Don't worry Page-Chan, let's go <Link href="/">back home</Link>!
        </div>
    </div>
</div>

<style>
    div.not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        flex: 1;
        padding: 2rem;
        text-align: center;

        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                    url("https://picsum.photos/1920/1080") no-repeat center center;
    }

    h1 {
        font-size: 2rem;
        color: var(--text-secondary-color);
    }

    div.left-align {
        text-align: left;
        margin-top: 1rem;
    }

    div.text {
        padding: 2rem;

        border-radius: 0.5rem;

        background-color: color-mix(in srgb, var(--main-color) 80%, transparent);
    }
</style>