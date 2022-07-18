<script lang='ts'>
	import {createCurlCommand} from './helpers/curl';
	import Highlight from './Highlight.svelte';

	import RawBody from './RawBody.svelte';
	import RequestBody from './RequestBody.svelte';

	import type {CollectionItemRoute} from './types/collection';

	export let responses: CollectionItemRoute['response'];

	let activeResponse: CollectionItemRoute['response'][0];
	let contentType: string;

	$: activeResponse = responses && responses.length && responses[0];
	$: contentType = activeResponse?.header
		?.find((item) => item.key?.toLowerCase() === 'content-type')
		?.value.replace(/;.+/, '');
</script>

<div class='tabs'>
	{#each responses as response}
		<button
			class='btn'
			class:active={activeResponse === response}
			on:click={() => (activeResponse = response)}
		>
			{response.code}
			{response.status}
		</button>
	{/each}
</div>

{#if activeResponse}
	<section>
		<p>{activeResponse.name}</p>
	</section>

	<section>
		<h4>Original Request</h4>

		<RequestBody body={activeResponse.originalRequest.body} />
	</section>

	<details>
		<summary>
			<h5>Curl</h5>
		</summary>
		<Highlight
			text={createCurlCommand({
				method: activeResponse.originalRequest.method,
				url: activeResponse.originalRequest.url.raw,
				headers:
					Object.fromEntries(
						activeResponse.originalRequest.header
							.map((item) => (item ? [item.key, item.value] : null))
							.filter(Boolean),
					) || {},
				data: activeResponse.originalRequest.body?.raw || '',
			})}
			language='shell'
		/>
	</details>

	{#if activeResponse.body}
		<section>
			<h4>Response</h4>

			<RawBody {contentType} bodyRaw={activeResponse.body} />
		</section>
	{/if}
{/if}

<style>
	.active {
		background-color: var(--theme-primary);
	}

	summary {
		border-bottom: 1px solid var(--theme-elevation-5);
		cursor: pointer;
	}

	summary h5 {
		display: inline-block;
		margin-left: 10px;
	}
</style>
