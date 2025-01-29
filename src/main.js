import generatedRoutes from "virtual:generated-pages";
import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import "./assets/scss/design.scss";

const routes = generatedRoutes;

/**
 * Google Fonts 読み込み
 */
const loadGoogleFonts = () => {
	const fonts = [
		"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap",
	];

	for (const href of fonts) {
		const link = document.createElement("link");
		link.href = href;
		link.rel = "stylesheet";
		document.head.appendChild(link);
	}
};

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(App, { routes }, ({ _, router, isClient }) => {
	if (isClient) {
		loadGoogleFonts();
	}

	router.beforeEach((to, _, next) => {
		console.log(`Navigating to ${to.path}`);
		next();
	});
});
