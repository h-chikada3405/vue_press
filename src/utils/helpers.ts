import { type Ref, onMounted, onUnmounted, ref, watch } from "vue";
import getSlug from "./composables/getSlug";

/**
 * body要素にpageNamesに含まれるクラスがついているか判定
 * @param {string[]|string} pageNames
 * @returns {Ref<boolean>}
 * @example
 * isPage('index', 'contact')
 */
const isPage = (pageNames: string[] | string): Ref<boolean> => {
	const result = ref(false);
	const slug = getSlug();
	const namesArray = Array.isArray(pageNames) ? pageNames : [pageNames];

	watch(
		() => slug.value,
		(newSlug) => {
			if (newSlug) {
				result.value = namesArray.includes(newSlug);
			}
		},
		{ immediate: true },
	);

	return result;
};

/**
 * モバイルデバイスかどうかを判定
 * @returns {Ref<boolean>} モバイルデバイスなら true, それ以外は false
 */
const isMobile = (): Ref<boolean> => {
	const isMobile = ref(false);

	const updateIsMobile = (): void => {
		const windowWidth = window.innerWidth;
		const breakpoint = 768;
		const isMobileUserAgent =
			/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/.test(
				navigator.userAgent.toLowerCase(),
			);

		isMobile.value = windowWidth <= breakpoint || isMobileUserAgent;
	};
	updateIsMobile();

	onMounted(() => {
		window.addEventListener("resize", updateIsMobile);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", updateIsMobile);
	});
	return isMobile;
};

export { isPage, isMobile };
