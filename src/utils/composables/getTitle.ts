import { ref, Ref } from "vue";
import getSlug from "./getSlug";
import { fetchPages } from "../api";

const getTitle = (): Ref<string> => {
  const title = ref("");
  const slug = getSlug();

  fetchPages({ slug: slug })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        title.value = data[0].title.rendered;
      } else if (!Array.isArray(data)) {
        title.value = data.title.rendered;
      }
    })
    .catch((error) => {
      console.error('Failed to fetch title:', error);
      title.value = "";
    });

  return title;
};

export default getTitle;
