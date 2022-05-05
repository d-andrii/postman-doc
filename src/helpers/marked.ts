import prism from 'prismjs';
import {marked} from 'marked';

export const parseMarkdown = (text: string) =>
	new Promise<string>((resolve, reject) => {
		marked(
			text,
			{
				highlight: (code, lang, callback) => {
					const highlight = () =>
						prism.highlight(code, prism.languages[lang], lang);

					if (prism.languages[lang]) {
						callback(null, highlight());
					} else {
						prism.plugins.autoloader.loadLanguages(
							lang,
							() => callback(null, highlight()),
							(error: Error) => callback(error),
						);
					}
				},
			},
			(error, result) => (error ? reject(error) : resolve(result)),
		);
	});
