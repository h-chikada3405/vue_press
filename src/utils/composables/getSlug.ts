import { ref, Ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const getSlug = (): Ref<string> => {
  const route = useRoute();
  const slug = ref('');

  watchEffect(() => {
    if (typeof route.name === 'string') {
      slug.value = route.name;
    }
  });

  return slug;
};

export default getSlug;
