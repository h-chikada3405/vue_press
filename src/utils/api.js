import axios from 'axios';

/**
 * API Base URL を取得
 *
 * @returns {string}
 */
const getApiBaseUrl = () => {
  return `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_BASE_PATH}`;
}

/**
 * 固定ページの取得（ページIDが指定された場合はそのページだけ取得）
 *
 * @param {number} [pageId] - 固定ページのID（省略可能）
 * @returns {Promise<Array|Object>} - 固定ページのデータ
 */
export const getPages = async ({
  pageId = null
} = {}) => {
  try {
    const url = pageId ? `${getApiBaseUrl()}/pages/${pageId}` : `${getApiBaseUrl()}/pages`;
    const response = await axios.get(url);

    return pageId ? response.data : response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return pageId ? {} : [];
  }
};

/**
 * 投稿データの取得
 *
 * @param {Object} options - オプションオブジェクト
 * @param {string} [options.postType='posts'] - 投稿タイプ(省略可能)
 * @param {number} [options.perPage=10] - 1回のリクエストで取得する件数(デフォルトは10)
 * @param {number} [options.page=1] - 取得するページ番号(デフォルトは1)
 * @param {string} [options.orderby='date'] - ソート基準(デフォルトは日付)
 * @param {string} [options.order='desc'] - ソート順(デフォルトは降順)
 * @returns {Promise<Array<Object>>} - 投稿のデータ
 */
export const getPosts = async ({
  postType = 'posts',
  perPage = 10,
  page = 1,
  orderby = 'date',
  order = 'desc'
} = {}) => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/${postType}`, {
      params: {
        per_page: perPage,
        page: page,
        orderby: orderby,
        order: order,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${postType}:`, error);
    return [];
  }
}
