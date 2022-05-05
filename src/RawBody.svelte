<script lang="ts">
	import Highlight from './Highlight.svelte';

	export let bodyRaw: string;
	export let contentType: string;

	let language: string;

	$: language =
		{
			'application/json': 'json',
			'text/html': 'html',
			'text/xml': 'xml',
		}[contentType] || 'text';
</script>

{#if bodyRaw}
	<Highlight text={bodyRaw} {language} />
{/if}
