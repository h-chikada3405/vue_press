/**
 * キャッシュマネージャークラス
 */
export class CacheManager<T = unknown> {
	private cache: Map<string, { data: T; timestamp: number }>;
	private expirationTime: number;

	constructor(expirationTime: number = 30 * 60 * 1000) {
		// デフォルト30分
		this.cache = new Map();
		this.expirationTime = expirationTime;
	}

	/**
	 * キャッシュキーの生成
	 * @param endpoint - APIエンドポイント
	 * @param params - リクエストパラメータ
	 * @returns キャッシュキー
	 */
	generateKey(endpoint: string, params: Record<string, unknown> = {}): string {
		return `${endpoint}:${JSON.stringify(params)}`;
	}

	/**
	 * キャッシュの取得
	 * @param key - キャッシュキー
	 * @returns キャッシュデータまたはnull
	 */
	get(key: string): T | null {
		const cached = this.cache.get(key);
		if (!cached) {
			return null;
		}

		const { data, timestamp } = cached;
		if (Date.now() - timestamp > this.expirationTime) {
			this.cache.delete(key);
			return null;
		}

		return data;
	}

	/**
	 * キャッシュの設定
	 * @param key - キャッシュキー
	 * @param data - キャッシュするデータ
	 */
	set(key: string, data: T): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
		});
	}

	/**
	 * キャッシュのクリア
	 * @param key - 特定のキャッシュをクリアする場合に指定
	 */
	clear(key?: string): void {
		if (key) {
			this.cache.delete(key);
		} else {
			this.cache.clear();
		}
	}
}

export const globalCache = new CacheManager();
