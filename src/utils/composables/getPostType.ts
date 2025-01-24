import { ref, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchPostType } from "../api";
import { PostType } from "../types";

const getPostType = (postId?: number | null): Ref<PostType | null> => {
  const route = useRoute();
  const currentPostId = ref(postId || null);
  const postType = ref<PostType | null>(null);

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
    { immediate: true }
  );

  watch(
    currentPostId,
    (newPostId) => {
      if (newPostId !== null && newPostId !== undefined) {
        fetchPostType(newPostId)
          .then((data) => {
            postType.value = data;
          })
          .catch((error) => {
            console.error("Failed to fetch post type:", error);
            postType.value = null;
          });
      }
    },
    { immediate: true }
  );

  return postType;
}

export default getPostType;
