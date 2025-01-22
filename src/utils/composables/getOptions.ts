import { Ref, ref } from "vue";
import { fetchOptions } from "../api";
import { OptionsData } from "../types";

/**
 * オプションページのデータ取得
 * @param key オプションのキー(複数指定可能)
 * @returns オプションのデータ
 */
const getOptions = (...keys: string[]): Ref<OptionsData | null> => {
  const options = ref<OptionsData | null>(null);

  fetchOptions()
    .then((data) => {
      if (keys && keys.length > 0) {
        options.value = keys.reduce((acc, key) => {
          if (data[key]) {
            acc[key] = data[key];
          }
          return acc;
        }, {} as OptionsData);
      } else {
        options.value = data;
      }
    })
    .catch((error) => {
      console.error('Failed to fetch options:', error);
      options.value = null;
    });

  return options;
};

export default getOptions;
