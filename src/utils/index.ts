import { createMobileDetector, createPageDetector } from "./helpers";

const { useIsPage, isPage } = createPageDetector();
const { useIsMobile, isMobile } = createMobileDetector();

export { useIsMobile, isMobile, useIsPage, isPage };
export { default as getId } from "./composables/getId";
export { default as getSlug } from "./composables/getSlug";
export { default as getTitle } from "./composables/getTitle";
export { default as getPages } from "./composables/getPages";
export { default as getPosts } from "./composables/getPosts";
export { default as getPost } from "./composables/getPost";
export { default as getTotalPostCount } from "./composables/getTotalPostCount";
export { default as getPostType } from "./composables/getPostType";
export { default as getCategories } from "./composables/getCategories";
export { default as getPrevPost } from "./composables/getPrevPost";
export { default as getNextPost } from "./composables/getNextPost";
export { default as getField } from "./composables/getField";
export { default as getOptions } from "./composables/getOptions";
