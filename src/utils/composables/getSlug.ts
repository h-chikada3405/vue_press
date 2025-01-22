import { type Ref, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const getSlug = (): Ref<string> => {
	const route = useRoute();
	const slug = ref("");

	watchEffect(() => {
		const pathSegments = route.path
			.split("/")
			.filter((segment) => segment !== "");
		if (pathSegments.length === 0) {
			slug.value = route.name as string;
		} else if (pathSegments.length === 1) {
			slug.value = pathSegments[0];
		} else {
			slug.value = pathSegments.slice(1).join("/");
		}
	});

	return slug;
};

export default getSlug;
