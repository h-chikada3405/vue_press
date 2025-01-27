import { type Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchPosts } from "../api";
import type { WordPressPost } from "../types";
import getPostType from "./getPostType";

const getPost = ({
	postType,
	postId,
}: {
	postType?: string;
	postId?: number | null;
} = {}): Ref<WordPressPost | null> => {
	const route = useRoute();
	const currentPostId = ref(postId || null);
	const post = ref<WordPressPost | null>(null);

	watch(
		() => route?.params.id,
		(newId) => {
			if (newId) {
				const numericId = Number(newId);
				if (!Number.isNaN(numericId)) {
					currentPostId.value = numericId;
				}
			}
		},
		{ immediate: true },
	);

	watch(
		currentPostId,
		(newPostId) => {
			if (newPostId !== null && newPostId !== undefined) {
				const currentPostType = postType
					? ref({ post_type: postType })
					: getPostType(newPostId, route.params);
				watch(currentPostType, (newPostType) => {
					if (newPostType) {
						fetchPosts({ postType: newPostType.post_type, postId: newPostId })
							.then((data) => {
								post.value = Array.isArray(data) ? data[0] : data;
							})
							.catch((error) => {
								console.error("Failed to fetch post:", error);
								post.value = null;
							});
					}
				});
			}
		},
		{ immediate: true },
	);

	return post;
};

export default getPost;
