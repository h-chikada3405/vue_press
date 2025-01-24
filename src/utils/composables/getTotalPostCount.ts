import { ref, Ref } from "vue";
import { fetchTotalPostCount } from "../api";

const getTotalPostCount = ({
  postType
}: {
  postType?: string
} = {}): Ref<number | null> => {
  const totalPostCount = ref<number | null>(null);

  fetchTotalPostCount({ postType })
    .then((data) => {
      totalPostCount.value = data;
    })
    .catch((error) => {
      console.error("Failed to fetch total post count:", error);
      totalPostCount.value = null;
    });

  return totalPostCount;
}

export default getTotalPostCount;
