/// <reference types="vite/client" />
import axios from "axios";
import { globalCache } from "./cache";
import type {
	AdjacentPost,
	Category,
	OptionsData,
	PostType,
	WordPressPage,
	WordPressPost,
} from "./types";

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
	categories,
}: {
	postType?: string;
	postId?: number;
	perPage?: number;
	page?: number;
	orderby?: string;
	order?: "asc" | "desc";
	categories?: number | number[];
} = {}): Promise<WordPressPost | WordPressPost[]> => {
	const adjustedPostType = postType === "post" ? "posts" : postType;
	const endpoint = postId ? `${adjustedPostType}/${postId}` : adjustedPostType;
	const params: Record<string, unknown> = {
		per_page: perPage,
		page,
		orderby,
		order,
	};

	if (categories) {
		params.categories = Array.isArray(categories)
			? categories.join(",")
			: categories;
	}

	return cachedRequest(endpoint, params, async () => {
		try {
			const response = await axios.get(`${getApiBaseUrl()}/${endpoint}`, {
				params: postId ? undefined : params,
			});
			return response.data;
		} catch (error) {
			console.error(`Error fetching ${adjustedPostType}:`, error);
			return postId ? {} : [];
		}
	});
};

/**
 * 投稿総数の取得
 * @param options - オプションオブジェクト
 * @param options.postType - 投稿タイプ(省略可能)
 * @returns 投稿のデータ
 */
export const fetchTotalPostCount = async ({
	postType = "posts",
	categories,
}: {
	postType?: string;
	categories?: number | number[];
} = {}): Promise<number | null> => {
	const adjustedPostType = postType === "post" ? "posts" : postType;
	const params: Record<string, unknown> = {};

	if (categories) {
		params.categories = Array.isArray(categories)
			? categories.join(",")
			: categories;
	}

	return cachedRequest(adjustedPostType, params, async () => {
		try {
			const response = await axios.get(
				`${getApiBaseUrl()}/${adjustedPostType}`,
				{
					params,
				},
			);
			return response.headers["x-wp-total"];
		} catch (error) {
			console.error(`Error fetching ${adjustedPostType}:`, error);
			return null;
		}
	});
};

/**
 * 投稿タイプデータの取得
 * @param postId - 投稿ID
 * @returns 投稿タイプのデータ
 */
export const fetchPostType = async (postId: number): Promise<PostType> => {
	if (!postId) {
		throw new Error("postId is required");
	}

	const endpoint = `post-type/${postId}`;

	return cachedRequest(endpoint, {}, async () => {
		try {
			const response = await axios.get(`${getApiBaseUrl()}/${endpoint}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching post type:", error);
			return postId ? {} : [];
		}
	});
};

/**
 * カデゴリデータの取得
 * @param postType - 投稿タイプ
 * @returns カデゴリのデータ
 */
export const fetchCategories = async ({
	postType = "posts",
	slug,
}: {
	postType?: string;
	slug?: string;
} = {}): Promise<Category[]> => {
	const endpoint = "categories";
	const params = { post_type: postType, slug };

	return cachedRequest(endpoint, params, async () => {
		try {
			const response = await axios.get(`${getApiBaseUrl()}/${endpoint}`, {
				params,
			});
			return response.data;
		} catch (error) {
			console.error(`Error fetching ${endpoint}:`, error);
			return [];
		}
	});
};

/**
 * 隣接する投稿データの取得
 * @param postId - 投稿ID
 * @returns 隣接する投稿のデータ
 */
export const fetchAdjacentPosts = async (
	postId: number,
): Promise<AdjacentPost | null> => {
	if (!postId) {
		throw new Error("postId is required");
	}

	const endpoint = `adjacent-posts/${postId}`;

	return cachedRequest(endpoint, {}, async () => {
		try {
			const response = await axios.get(`${getApiBaseUrl()}/${endpoint}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching ${endpoint}:`, error);
			return null;
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
