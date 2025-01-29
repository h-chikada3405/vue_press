import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * マウント時とページ遷移のたびに実行
 *
 * @returns {void}
 */
export const initPageAnimations = () => {
	gsap.registerPlugin(ScrollTrigger);
};

/**
 * 非同期なコンポーネントが読み込まれたときに実行
 *
 * @returns {void}
 */
export const resizedAnimations = () => {
	ScrollTrigger.refresh();
};
