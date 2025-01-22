import { type Ref, ref, watch } from "vue";
import type { AcfFields } from "../types";
import getId from "./getId";
import getPages from "./getPages";

const getField = (
	fieldName: string,
	pageId?: number | null,
): Ref<unknown[]> => {
	const currentPageId = ref(pageId);
	const field = ref<unknown[]>([]);

	if (pageId === undefined || pageId === null) {
		const idRef = getId();
		watch(idRef, (newId) => {
			if (newId !== null) {
				currentPageId.value = newId;
			}
		});
	}

	watch(
		currentPageId,
		(newPageId) => {
			if (newPageId !== null) {
				const pageData = getPages({ pageId: newPageId });
				watch(pageData, (newPageData) => {
					if (
						newPageData &&
						(newPageData as { acf?: AcfFields }).acf &&
						(newPageData as { acf: AcfFields }).acf[fieldName]
					) {
						const fieldValue = (newPageData as { acf: AcfFields }).acf[
							fieldName
						];
						field.value = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
					}
				});
			}
		},
		{ immediate: true },
	);

	return field;
};

export default getField;
