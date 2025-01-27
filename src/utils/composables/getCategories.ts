import { type Ref, ref } from "vue";
import { fetchCategories } from "../api";
import type { Category } from "../types";

const getCategories = ({
	postType,
	slug,
}: {
	postType?: string;
	slug?: string;
} = {}): Ref<Category[] | null> => {
	const categories = ref<Category[] | null>(null);

	fetchCategories({ postType, slug })
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
