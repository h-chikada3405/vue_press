import { ref, Ref, watch } from "vue";
import { fetchPostType } from "../api";
import { PostType } from "../types";

const getPostType = (postId?: number | null, routeParams?: any): Ref<PostType | null> => {
  const currentPostId = ref(postId || null);
  const postType = ref<PostType | null>(null);

  if (routeParams) {
    watch(
      () => routeParams.id,
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
  }

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
