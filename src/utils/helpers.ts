import { type Ref, onMounted, onUnmounted, ref, watch } from "vue";
import getSlug from "./composables/getSlug";

/**
 * ページ検出のための関数を生成
 * @returns ページ検出関連の関数
 */
export function createPageDetector(): {
	useIsPage: (pageNames: string[] | string) => Ref<boolean>;
	isPage: (pageNames: string[] | string) => boolean;
} {
	/**
	 * 指定されたページ名と現在のスラッグを比較
	 * @param pageNames - 検証するページ名
	 * @returns ページ一致の状態を持つリアクティブな参照
	 */
	const useIsPage = (pageNames: string[] | string): Ref<boolean> => {
		const result = ref(false);
		const slug = getSlug();
		const namesArray = Array.isArray(pageNames) ? pageNames : [pageNames];

		watch(
			() => slug.value,
			(newSlug) => {
				result.value = newSlug ? namesArray.includes(newSlug) : false;
			},
			{ immediate: true },
		);

		return result;
	};

	/**
	 * 静的なページ名判定
	 * @param pageNames - 検証するページ名
	 * @returns ページが一致するかどうか
	 */
	const isPage = (pageNames: string[] | string): boolean => {
		const slug = getSlug().value;
		const namesArray = Array.isArray(pageNames) ? pageNames : [pageNames];
		return namesArray.includes(slug);
	};

	return {
		useIsPage,
		isPage,
	};
}

/**
 * モバイルデバイス検出のための関数を生成
 * @returns モバイルデバイス検出関連の関数
 */
export function createMobileDetector(): {
	useIsMobile: () => Ref<boolean>;
	isMobile: () => boolean;
} {
	const MOBILE_BREAKPOINT = 768;

	/**
	 * モバイルデバイスかどうかを判定
	 * @returns {boolean} モバイルデバイスであれば true
	 */
	const checkIsMobile = (): boolean => {
		if (typeof window === "undefined") return false;

		const windowWidth = window.innerWidth;
		const mobileUserAgentPattern =
			/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/;

		return (
			windowWidth <= MOBILE_BREAKPOINT ||
			mobileUserAgentPattern.test(navigator.userAgent.toLowerCase())
		);
	};

	/**
	 * リアクティブなモバイル検出フック
	 * @returns モバイル状態を持つリアクティブな参照
	 */
	const useIsMobile = (): Ref<boolean> => {
		const mobileRef = ref(false);

		if (typeof window !== "undefined") {
			const updateMobileStatus = (): void => {
				mobileRef.value = checkIsMobile();
			};

			updateMobileStatus();

			onMounted(() => {
				window.addEventListener("resize", updateMobileStatus);
			});

			onUnmounted(() => {
				window.removeEventListener("resize", updateMobileStatus);
			});
		}

		return mobileRef;
	};

	/**
	 * 静的なモバイル判定
	 * @returns モバイルデバイスであれば true
	 */
	const isMobile = (): boolean => checkIsMobile();

	return {
		useIsMobile,
		isMobile,
	};
}
