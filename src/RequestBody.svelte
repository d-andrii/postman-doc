<script lang="ts">
	import App from './App.svelte';
	import Highlight from './Highlight.svelte';

	import type {CollectionItemRequest} from './types/collection';

	export let body: CollectionItemRequest['body'];

	let language: string;

	$: language = (body?.mode === 'raw' && body.options?.raw.language) || 'text';
</script>

{#if body}
	{#if body.mode === 'raw'}
		<Highlight text={body.raw} {language} />
	{:else if body.mode === 'formdata'}
		<h5>Form Data</h5>
		<table>
			<thead>
				<tr>
					<th>Field</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{#each body.formdata as item}
					<tr>
						<td>{item.key}</td>
						<td>{item.type}</td>
						<td>{item.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
{/if}
