import { type Ref, ref } from "vue";
import { fetchPosts } from "../api";
import { WordPressPost } from "../types";

const getPosts = ({
	postType = "posts",
	perPage = 10,
	page = 1,
	orderby = "date",
	order = "desc",
}: {
	postType?: string;
	perPage?: number;
	page?: number;
	orderby?: string;
	order?: "asc" | "desc";
} = {}): Ref<WordPressPost | WordPressPost[]> => {
	const posts = ref<WordPressPost | WordPressPost[]>([]);

	fetchPosts({ postType, perPage, page, orderby, order })
		.then((data) => {
			posts.value = data;
		})
		.catch((error) => {
			console.error(`Failed to fetch ${postType}:`, error);
			posts.value = [];
		});

	return posts;
};

export default getPosts;
