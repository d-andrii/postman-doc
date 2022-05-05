<script lang="ts">
	import Highlight from './Highlight.svelte';

	import type {CollectionItemRequest} from './types/collection';

	export let body: CollectionItemRequest['body'];

	let language: string;

	$: language = body?.options?.raw.language || 'text';
</script>

{#if body?.raw}
	<Highlight text={body.raw} {language} />
{/if}
