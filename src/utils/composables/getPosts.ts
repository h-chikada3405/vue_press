import { type Ref, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { fetchCategories, fetchPosts } from "../api";
import type { Category, WordPressPost } from "../types";

const getPosts = ({
	postType,
	perPage,
	page,
	orderby,
	order,
	categoryName,
}: {
	postType?: string;
	perPage?: number;
	page?: number;
	orderby?: string;
	order?: "asc" | "desc";
	categoryName?: string;
} = {}): Ref<WordPressPost | WordPressPost[]> => {
	const route = useRoute();
	const posts = ref<WordPressPost | WordPressPost[]>([]);
	const categoryId = ref<number | null>(null);
	const slug = ref(categoryName || (route.params.slug as string));
	const categories = ref<Category[] | null>(null);

	const fetchPostsData = async (
		postType: string | undefined,
		perPage: number | undefined,
		page: number | undefined,
		orderby: string | undefined,
		order: "asc" | "desc" | undefined,
		categories?: number,
	): Promise<WordPressPost | WordPressPost[]> => {
		return fetchPosts({ postType, perPage, page, orderby, order, categories });
	};

	const loadPosts = async (page: number) => {
		try {
			const data = await fetchPostsData(
				postType,
				perPage,
				page,
				orderby,
				order,
				categoryId.value || undefined,
			);
			posts.value = data;
		} catch (error) {
			console.error(`Failed to fetch ${postType}:`, error);
			posts.value = [];
		}
	};

	const updateCategories = async () => {
		if (!slug.value) {
			categories.value = null;
			categoryId.value = null;
			return;
		}

		const fetchedCategories = await fetchCategories({ slug: slug.value });
		categories.value = fetchedCategories;
		categoryId.value =
			fetchedCategories.length > 0 ? fetchedCategories[0].id : null;
	};

	watchEffect(async () => {
		await updateCategories();
		if (categories.value && categories.value.length > 0) {
			categoryId.value = categories.value[0].id;
		}
		await loadPosts(page || 1);
	});

	watch(
		() => [route.query.page, route.params.slug],
		async ([newPage, newSlug]) => {
			if (newSlug !== slug.value) {
				slug.value = newSlug as string;
				await updateCategories();
			}
			const newPageNumber = Number(newPage) || 1;
			await loadPosts(newPageNumber);
		},
		{ immediate: true },
	);

	return posts;
};

export default getPosts;
