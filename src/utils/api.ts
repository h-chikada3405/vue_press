/// <reference types="vite/client" />
import axios from "axios";
import { globalCache } from "./cache";
import type { OptionsData, WordPressPage, WordPressPost } from "./types";

/**
 * API Base URL を取得
 * @returns APIのベースURL
 */
const getApiBaseUrl = (): string => {
	return `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_BASE_PATH}`;
};

/**
 * APIリクエストをキャッシュ付きで実行する汎用関数
 * @param endpoint - APIエンドポイント
 * @param params - リクエストパラメータ
 * @param fetchFunction - 実際のフェッチ処理を行う関数
 * @returns レスポンスデータ
 */
const cachedRequest = async <T>(
	endpoint: string,
	params: Record<string, unknown>,
	fetchFunction: () => Promise<T>,
): Promise<T> => {
	const cacheKey = globalCache.generateKey(endpoint, params);
	const cachedData = globalCache.get(cacheKey);

	if (cachedData) {
		return cachedData as T;
	}

	const data = await fetchFunction();
	globalCache.set(cacheKey, data);
	return data;
};

/**
 * 固定ページの取得
 * @param options - オプションオブジェクト
 * @param options.pageId - 固定ページID(省略可能)
 * @param options.slug - スラッグ(省略可能)
 * @returns 固定ページのレスポンスデータ
 */
export const fetchPages = async ({
	pageId = null,
	slug = null,
}: {
	pageId?: number | null;
	slug?: string | null;
} = {}): Promise<WordPressPage | WordPressPage[]> => {
	const endpoint = "pages";
	const params = { pageId, slug, per_page: 100 };

	return cachedRequest(endpoint, params, async () => {
		try {
			let url = `${getApiBaseUrl()}/${endpoint}`;

			if (pageId) {
				url += `/${pageId}`;
			} else if (slug && slug !== "index") {
				url += `?slug=${slug}`;
			} else {
				url += `?per_page=${params.per_page}`;
			}

			const response = await axios.get(url);
			const responseData = response.data;

			if (slug === "index") {
				const baseUrl = `${import.meta.env.VITE_BASE_URL}/`;
				const filteredData = Array.isArray(responseData)
					? responseData.filter((page) => page.link === baseUrl)
					: responseData.link === baseUrl
						? [responseData]
						: [];
				return filteredData.length > 0 ? filteredData[0] : {};
			}

			return responseData;
		} catch (error) {
			console.error("Error fetching pages:", error);
			return pageId || slug ? {} : [];
		}
	});
};

/**
 * 投稿データの取得
 * @param options - オプションオブジェクト
 * @param options.postType - 投稿タイプ(省略可能)
 * @param options.postId - 投稿ID(省略可能)
 * @param options.perPage - 1回のリクエストで取得する件数(デフォルトは10)
 * @param options.page - 取得するページ番号(デフォルトは1)
 * @param options.orderby - ソート基準(デフォルトは日付)
 * @param options.order - ソート順(デフォルトは降順)
 * @returns 投稿のデータ
 */
export const fetchPosts = async ({
	postType = "posts",
	postId,
	perPage = 10,
	page = 1,
	orderby = "date",
	order = "desc",
}: {
	postType?: string;
	postId?: number;
	perPage?: number;
	page?: number;
	orderby?: string;
	order?: "asc" | "desc";
} = {}): Promise<WordPressPost | WordPressPost[]> => {
	const endpoint = postId ? `${postType}/${postId}` : postType;
	const params = { perPage, page, orderby, order };

	return cachedRequest(endpoint, params, async () => {
		try {
			const response = await axios.get(`${getApiBaseUrl()}/${endpoint}`, {
				params: postId
					? undefined
					: { per_page: perPage, page, orderby, order },
			});
			return response.data;
		} catch (error) {
			console.error(`Error fetching ${postType}:`, error);
			return postId ? {} : [];
		}
	});
};

/**
 * オプションページのデータ取得
 * @returns オプションのデータ
 */
export const fetchOptions = async (): Promise<OptionsData> => {
	return cachedRequest("options", {}, async () => {
		try {
			const response = await axios.get(`${getApiBaseUrl()}/options`);
			return response.data || {};
		} catch (error) {
			console.error("Error fetching options:", error);
			return {};
		}
	});
};
