import generatedRoutes from "virtual:generated-pages";
import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import "./assets/scss/design.scss";

const routes = generatedRoutes;

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(App, { routes }, ({ _, router }) => {
	router.beforeEach((to, _, next) => {
		console.log(`Navigating to ${to.path}`);
		next();
	});
});
