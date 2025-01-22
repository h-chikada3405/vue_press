import { type Ref, ref } from "vue";
import { fetchOptions } from "../api";
import type { OptionsData } from "../types";

/**
 * オプションページのデータ取得
 * @param key オプションのキー(複数指定可能)
 * @returns オプションのデータ
 * @example
 * const nameOption = getOptions('companyName');
 * console.log(nameOption.value); // { companyName: '株式会社トップ' }
 *
 * const selectedOptions = getOptions('companyName', 'companyTel');
 * console.log(selectedOptions.value); // { companyName: '株式会社トップ', companyTel: '052-583-1919' }
 *
 * const allOptions = getOptions();
 * console.log(allOptions.value); // { companyName: '株式会社トップ', companyTel: '052-583-1919' }
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
			console.error("Failed to fetch options:", error);
			options.value = null;
		});

	return options;
};

export default getOptions;
