import { ref, Ref } from "vue";
import getSlug from "./getSlug";
import { getPages } from "../api";

const getId = (): Ref<number | null> => {
  const id = ref<number | null>(null);
  const slug = getSlug();

  getPages({ slug: slug })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        id.value = data[0].id;
      } else if (!Array.isArray(data)) {
        id.value = data.id;
      }
    })
    .catch((error) => {
      console.error('Failed to fetch title:', error);
      id.value = null;
    });

  return id;
};

export default getId;
