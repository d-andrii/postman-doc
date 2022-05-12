<script lang="ts">
	import {parseMarkdown} from './helpers/marked';

	import type {CollectionItem} from './types/collection';
	import {getEntryUrl} from './helpers/entry';
	import Response from './Response.svelte';

	export let entry: CollectionItem;
	export let entryUrl = '';

	$: entryUrl = getEntryUrl(entry);
</script>

{#if 'item' in entry}
	<section>
		<h2>{entry.name}</h2>

		{#if entry.description}
			{#await parseMarkdown(entry.description) then result}
				<p>{@html result}</p>
			{/await}
		{/if}

		{#each entry.item as item}
			<svelte:self entry={item} />
		{/each}
	</section>
{:else}
	<div id={entryUrl} class="details">
		<h3>{entry.name}</h3>

		<div>
			<div class="route">
				<div class="method">{entry.request.method}</div>
				<div class="path">/{entry.request.url?.path.join('/')}</div>
			</div>

			{#if entry.request.description}
				{#await parseMarkdown(entry.request.description) then result}
					<p>{@html result}</p>
				{/await}
			{/if}

			{#if entry.request.url?.query?.length}
				<div>
					<h4>Query</h4>
					<table>
						<thead>
							<tr>
								<th>Param</th>
								<th>Value</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{#each entry.request.url.query as item}
								<tr>
									<td>{item.key}</td>
									<td>{item.value}</td>
									<td>{item.description}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if entry.request.header?.length}
				<div>
					<h4>Headers</h4>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Value</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{#each entry.request.header as item}
								<tr>
									<td>{item.key}</td>
									<td>{item.value}</td>
									<td>{item.description}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>

		<div class="response">
			{#if entry.response.length}
				<Response responses={entry.response} />
			{/if}
		</div>
	</div>
{/if}

<style>
	h2 {
		border-bottom: 1px solid var(--theme-elevation-1);
		padding-bottom: 10px;
	}

	h3 {
		margin-top: 0;
		grid-column: 1 / span 2;
	}

	.details {
		box-sizing: border-box;
		column-gap: 20px;
		display: grid;
		grid-template-columns: auto 480px;
		margin-bottom: 20px;
	}

	.route {
		cursor: pointer;
		font-family: var(--theme-font-main);
		margin-bottom: 20px;
		margin-top: -10px;
	}

	.method,
	.path {
		display: inline-block;
	}

	.method {
		font-weight: bold;
	}

	.path {
		color: var(--theme-text-second);
	}

	.response {
		border-left: 1px solid var(--theme-elevation-1);
		padding-left: 20px;
	}
</style>
