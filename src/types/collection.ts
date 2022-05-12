export interface CollectionItemBase {
	name: string;
}

export interface CollectionItemFolder extends CollectionItemBase {
	description?: string;
	item: CollectionItem[];
}

export interface RawBody {
	mode: 'raw';
	options?: {
		raw: {
			language: string;
		};
	};
	raw: string;
}

export interface FormDataBody {
	mode: 'formdata';
	formdata: Array<{
		key: string;
		description: string;
		type: string;
		value?: string;
		src?: string | string[];
	}>;
}

export interface CollectionItemRequest {
	method: string;
	description?: string;
	header?: Array<{
		key: string;
		value: string;
		description: string;
	}>;
	body?: RawBody | FormDataBody;
	url?: {
		raw: string;
		path: string[];
		query?: Array<{
			key: string;
			value: string;
			description: string;
		}>;
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
