import { type Ref, ref } from "vue";
import { fetchCategories } from "../api";
import type { Category } from "../types";

const getCategories = ({
	postType,
	taxonomy,
	slug,
}: {
	postType?: string;
	taxonomy?: string;
	slug?: string;
} = {}): Ref<Category[] | null> => {
	const categories = ref<Category[] | null>(null);

	fetchCategories({ postType, taxonomy, slug })
		.then((data) => {
			categories.value = data;
		})
		.catch((error) => {
			console.error("Failed to fetch categories:", error);
			categories.value = null;
		});

	return categories;
};

export default getCategories;
