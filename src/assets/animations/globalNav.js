import { gsap } from "gsap";

let tl = null;
let globalNav = null;

/**
 * グローバルナビのアニメーションを初期化
 * @requires void
 */
export const InitGlobalNav = () => {
	globalNav = document.querySelector(".global-nav");

	if (!globalNav) {
		console.error("Global navigation element not found!");
		return;
	}

	if (!tl) {
		tl = gsap.timeline({ paused: true });

		gsap.set(globalNav, {
			autoAlpha: 0,
		});

		tl.to(globalNav, {
			autoAlpha: 1,
			duration: 0.3,
			ease: "power3.out",
		});
	}
};

/**
 * グローバルナビのアニメーションを切り替え
 * @param {boolean} isOpen
 * @requires void
 */
export const AnimateGlobalNav = (isOpen) => {
	if (!tl || !globalNav) {
		return;
	}

	isOpen ? tl.play() : tl.reverse();
};
