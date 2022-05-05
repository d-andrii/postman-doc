import type {CollectionItem} from '../types/collection';

export const getEntryUrl = (entry: CollectionItem) =>
	entry && 'request' in entry && entry.request.url
		? `${entry.request.method.toLowerCase()}-${entry.request.url.path.join(
				'-',
		  )}`
		: '';
