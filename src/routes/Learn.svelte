<script lang="ts">
	import { GetCurrentParams } from "../Router";

    const params = GetCurrentParams();
    const albumIndex = params.album || 'none';
</script>

<div>
    <h1>Learn</h1>
    <p>Album Index: {albumIndex}</p>
</div>