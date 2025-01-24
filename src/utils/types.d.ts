export interface WordPressPage {
	acf: AcfFields;
	author: number;
	class_list: string[];
	comment_status: string;
	content: {
		rendered: string;
		protected: boolean;
	};
	date: string;
	date_gmt: string;
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	featured_media: number;
	guid: {
		rendered: string;
	};
	id: number;
	link: string;
	menu_order: number;
	meta: {
		footnotes: string;
	};
	modified: string;
	modified_gmt: string;
	parent: number;
	ping_status: string;
	slug: string;
	status: string;
	template: string;
	title: {
		rendered: string;
	};
	type: string;
}

export interface AcfFields {
	[key: string]: unknown;
}

export interface WordPressPost {
	acf: AcfFields;
	author: number;
	class_list: string[];
	comment_status: string;
	content: {
		rendered: string;
		protected: boolean;
	};
	date: string;
	date_gmt: string;
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	featured_media: number;
	guid: {
		rendered: string;
	};
	id: number;
	link: string;
	menu_order: number;
	meta: {
		footnotes: string;
	};
	modified: string;
	modified_gmt: string;
	parent: number;
	ping_status: string;
	slug: string;
	status: string;
	template: string;
	title: {
		rendered: string;
	};
	type: string;
}

export interface PostType {
	post_type: string;
}

export interface AdjacentPost {
	prev: {
		id: number;
		title: string;
		slug: string;
	} | null;
	next: {
		id: number;
		title: string;
		slug: string;
	} | null;
}

export interface OptionsData {
	[key: string]: string;
}
