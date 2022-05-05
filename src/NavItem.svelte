<script lang="ts">
	import {getEntryUrl} from './helpers/entry';

	import type {CollectionItem} from './types/collection';

	export let entry: CollectionItem;
	export let entryUrl = '';

	$: entryUrl = getEntryUrl(entry);
</script>

{#if 'item' in entry}
	<details>
		<summary>
			<span>{entry.name}</span>
		</summary>

		{#each entry.item as item}
			<svelte:self entry={item} />
		{/each}
	</details>
{:else}
	<a class="route" href="#{entryUrl}">
		<div class="method">{entry.request.method}</div>
		<div class="path">/{entry.request.url?.path.join('/')}</div>
	</a>
{/if}

<style>
	summary {
		cursor: pointer;
		padding: 6px 0;
	}

	summary span {
		margin-left: 10px;
	}

	.route {
		color: var(--theme-text-second);
		display: block;
		font-size: 0.9rem;
		overflow: hidden;
		padding: 6px 0;
		text-decoration: none;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.route:hover {
		background-color: var(--theme-elevation-1);
	}

	.method {
		border: 2px solid var(--theme-text-second);
		display: inline-block;
		font-weight: bold;
		margin-right: 4px;
		text-align: center;
		width: 58px;
	}

	.path {
		display: inline;
	}
</style>
