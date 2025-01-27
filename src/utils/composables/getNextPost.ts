import { type Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchAdjacentPosts } from "../api";
import type { AdjacentPost } from "../types";

const getNextPost = (
	postId?: number | null,
): Ref<AdjacentPost["next"] | null> => {
	const route = useRoute();
	const currentPostId = ref(postId || null);
	const nextPost = ref<AdjacentPost["next"] | null>(null);

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
				fetchAdjacentPosts(newPostId)
					.then((data) => {
						nextPost.value = data?.next ?? null;
					})
					.catch((error) => {
						console.error("Failed to fetch next post:", error);
						nextPost.value = null;
					});
			}
		},
		{ immediate: true },
	);

	return nextPost;
};

export default getNextPost;
