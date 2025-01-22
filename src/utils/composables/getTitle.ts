import { type Ref, ref, watch } from "vue";
import { fetchPages } from "../api";
import getSlug from "./getSlug";

const getTitle = (slug: string | null = null): Ref<string> => {
	const title = ref("");
	const currentSlug = slug ?? getSlug().value;

	watch(
		() => currentSlug,
		(newSlug) => {
			if (newSlug) {
				fetchPages({ slug: newSlug })
					.then((data) => {
						if (Array.isArray(data) && data.length > 0) {
							title.value = data[0].title.rendered;
						} else if (!Array.isArray(data)) {
							title.value = data.title.rendered;
						}
					})
					.catch((error) => {
						console.error("Failed to fetch title:", error);
						title.value = "";
					});
			}
		},
		{ immediate: true },
	);

	return title;
};

export default getTitle;
