import { ref, Ref, watch } from "vue";
import getSlug from "./getSlug";
import { fetchPages } from "../api";

const getId = (): Ref<number | null> => {
  const id = ref<number | null>(null);
  const slug = getSlug();

  watch(
    () => slug.value,
    (newSlug) => {
      if (newSlug) {
        fetchPages({ slug: newSlug })
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              id.value = data[0].id;
            } else if (!Array.isArray(data)) {
              id.value = data.id;
            }
          })
          .catch((error) => {
            console.error("Failed to fetch title:", error);
            id.value = null;
          });
      }
    },
    { immediate: true }
  );

  return id;
};

export default getId;
