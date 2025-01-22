import { type Ref, ref } from "vue";
import { fetchPages } from "../api";
import type { WordPressPage } from "../types";

const getPages = ({
	pageId = null,
	slug = null,
}: {
	pageId?: number | null;
	slug?: string | null;
} = {}): Ref<WordPressPage | WordPressPage[] | Record<string, unknown>> => {
	const pages = ref<WordPressPage | WordPressPage[] | Record<string, unknown>>(
		[],
	);

	fetchPages({ pageId, slug })
		.then((data) => {
			pages.value = data;
		})
		.catch((error) => {
			console.error("Failed to fetch pages:", error);
			pages.value =
				pageId || slug
					? ({} as Record<string, unknown>)
					: ([] as WordPressPage[]);
		});

	return pages;
};

export default getPages;
