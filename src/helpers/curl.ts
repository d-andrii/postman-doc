export interface CurlOptions {
	method: string;
	url: string;
	data: string;
	headers: Record<string, string>;
}

const escape = (s: string) => s.replace(/'/g, `"'"`);

export const createCurlCommand = (opts: CurlOptions) =>
	[
		`curl -X ${opts.method} '${opts.url}'`,
		...Object.entries(opts.headers).map(
			([key, value]) => `-H '${escape(key)}: ${escape(value)}'`,
		),
		opts.data && `--data '${escape(opts.data.replace(/\n/g, '\n\t'))}'`,
	]
		.filter(Boolean)
		.join(' \\\n\t');

// .map((item, index) => (index === 0 ? item : `\t${item}`));
