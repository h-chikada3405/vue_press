import { useRoute } from "vue-router";

const getSlug = (): string => {
  const route = useRoute();

  if (typeof route.name === 'string') {
    return route.name;
  }

  return '';
};


export default getSlug;
