export interface CollectionItemBase {
	name: string;
}

export interface CollectionItemFolder extends CollectionItemBase {
	item: CollectionItem[];
}

export interface CollectionItemRequest {
	method: string;
	description?: string;
	header?: Array<{
		key: string;
		value: string;
	}>;
	body?: {
		mode: 'raw';
		options?: {
			raw: {
				language: string;
			};
		};
		raw: string;
	};
	url?: {
		raw: string;
		path: string[];
	};
}

export interface CollectionItemRoute extends CollectionItemBase {
	request: CollectionItemRequest;
	response: Array<{
		name: string;
		header?: Array<{
			key: string;
			value: string;
		}>;
		originalRequest: CollectionItemRequest;
		code: number;
		status: string;
		body: string;
	}>;
}

export type CollectionItem = CollectionItemFolder | CollectionItemRoute;

export interface Collection {
	info: {
		name: string;
		description: string;
	};
	item: CollectionItem[];
}