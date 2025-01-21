import { ref, Ref } from "vue";
import { WordPressPage } from "../types";
import { fetchPages } from "../api";

const getPages = ({
  pageId = null,
  slug = null,
}: {
  pageId?: string | null;
  slug?: string | null;
} = {}): Ref<WordPressPage | WordPressPage[] | {} | []> => {
  const pages = ref<WordPressPage | WordPressPage[] | {} | []>([]);

  fetchPages({ pageId, slug })
    .then((data) => {
      pages.value = data;
    })
    .catch((error) => {
      console.error('Failed to fetch pages:', error);
      pages.value = pageId || slug ? {} : [];
    });

  return pages;
};

export default getPages;
