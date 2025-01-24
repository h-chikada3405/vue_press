import { type Ref, ref, watch } from "vue";
import { fetchPosts } from "../api";
import type { WordPressPost } from "../types";
import { useRoute } from "vue-router";

const getPosts = ({
	postType,
	perPage,
	page,
	orderby,
	order,
}: {
	postType?: string;
	perPage?: number;
	page?: number;
	orderby?: string;
	order?: "asc" | "desc";
} = {}): Ref<WordPressPost | WordPressPost[]> => {
	const route = useRoute();
	const posts = ref<WordPressPost | WordPressPost[]>([]);

	const fetchPostsData = (
		postType: string | undefined,
		perPage: number | undefined,
		page: number | undefined,
		orderby: string | undefined,
		order: 'asc' | 'desc' | undefined
	): Promise<WordPressPost | WordPressPost[]> => {
		return fetchPosts({ postType, perPage, page, orderby, order });
	};

	const loadPosts = (page: number) => {
    fetchPostsData(postType, perPage, page, orderby, order)
      .then((data) => {
        posts.value = data;
      })
      .catch((error) => {
        console.error(`Failed to fetch ${postType}:`, error);
        posts.value = [];
      });
  };

  loadPosts(page || 1);

  watch(
    () => route.query.page,
    (newPage) => {
      const newPageNumber = Number(newPage);
      if (newPageNumber) {
        loadPosts(newPageNumber);
      }
    },
    { immediate: true }
  );

	return posts;
};

export default getPosts;
