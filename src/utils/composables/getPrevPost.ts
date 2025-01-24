import { Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchAdjacentPosts } from "../api";
import { AdjacentPost } from "../types";

const getPrevPost = (postId?: number | null): Ref<AdjacentPost['prev'] | null> => {
  const route = useRoute();
  const currentPostId = ref(postId || null);
  const prevPost = ref<AdjacentPost['prev'] | null>(null);

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
            prevPost.value = data?.prev ?? null;
          })
          .catch((error) => {
            console.error("Failed to fetch prev post:", error);
            prevPost.value = null;
          });
			}
		},
		{ immediate: true },
	);

  return prevPost;
}

export default getPrevPost;
