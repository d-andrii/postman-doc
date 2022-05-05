<script lang="ts">
	import prism from 'prismjs';

	export let text: string;
	export let language: string;

	const highlight = async (text: string, language: string) => {
		if (!prism.languages[language]) {
			await new Promise((resolve, reject) =>
				prism.plugins.autoloader.loadLanguages(language, resolve, reject),
			);
		}

		return prism.highlight(text, prism.languages[language], language);
	};

	let className: string;

	$: className = `language-${language}`;
</script>

{#if text && language}
	{#await highlight(text, language) then text}
		<pre class={className}><code class={className}>{@html text}</code></pre>
	{/await}
{/if}
