<script lang="ts">
	import Entry from './Entry.svelte';
	import prism from 'prismjs';
	import 'prismjs/plugins/autoloader/prism-autoloader';
	import {onMount} from 'svelte';

	import type {Collection} from './types/collection';
	import {parseMarkdown} from './helpers/marked';
	import NavItem from './NavItem.svelte';

	let collection: Collection;

	onMount(() => {
		prism.plugins.autoloader.languages_path =
			'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/';

		fetch('/doc.json')
			.then((res) => res.json())
			.then((doc) => (collection = doc));
	});
</script>

<svelte:head>
	<title>{collection?.info.name || 'Loading...'}</title>
</svelte:head>

{#if collection}
	<main>
		<div class="nav">
			<h2>Routes</h2>

			{#each collection.item as item}
				<NavItem entry={item} />
			{/each}
		</div>
		<div class="content">
			<h1>{collection.info.name}</h1>
			<p>
				{#await parseMarkdown(collection.info.description) then result}
					{@html result}
				{/await}
			</p>

			{#each collection.item as item}
				<Entry entry={item} />
			{/each}
		</div>
	</main>
{/if}

<style>
	main {
		box-sizing: border-box;
		column-gap: 20px;
		display: grid;
		grid-template-columns: 280px auto;
		padding: 20px 0;
		width: 100%;
	}

	.nav {
		border-right: 1px solid var(--theme-elevation-1);
		box-sizing: border-box;
		height: 100vh;
		overflow: auto;
		padding: 0 20px 40px 10px;
		position: sticky;
		top: 0;
	}

	.content {
		padding-right: 40px;
	}
</style>
