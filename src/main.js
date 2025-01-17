import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import * as apis from './utils/api'
import './assets/scss/editor.scss'
import './assets/scss/design.scss'

const routes = generatedRoutes

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router }) => {
    app.config.globalProperties.$apis = apis
    router.beforeEach((to, _, next) => {
      console.log(`Navigating to ${to.path}`);
      next();
    });
  }
);
