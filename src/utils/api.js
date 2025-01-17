import axios from 'axios';

/**
 * API Base URL を取得する
 *
 * @returns {string}
 */
const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL;;
}

/**
 * 固定ページを取得する（ページIDが指定された場合はそのページだけ取得）
 *
 * @param {number} [pageId] - 固定ページのID（省略可能）
 * @returns {Promise<Array|Object>} - 固定ページのデータ
 */
export const getPages = async (pageId) => {
  try {
    const url = pageId ? `${getApiBaseUrl()}/pages/${pageId}` : `${getApiBaseUrl()}/pages`;
    const response = await axios.get(url);

    return pageId ? response.data : response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return pageId ? {} : [];
  }
};
