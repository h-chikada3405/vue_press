import { onMounted, onUnmounted } from "vue";

/**
 * 非同期コンポーネントがマウントされるたびにコールバックを呼び出すカスタムフック（デバウンス対応）
 *
 * @param callback 非同期コンポーネントがマウントされたときに呼ばれるコールバック関数
 * @param delay コールバックを呼び出す前に待つ時間（ミリ秒）
 */
const onAsyncMounted = (callback: () => void, delay = 100): void => {
	let observer: MutationObserver;
	let timeout: ReturnType<typeof setTimeout>;

	const observeAsyncComponents = () => {
		observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === "childList") {
					for (const node of mutation.addedNodes) {
						if (
							node instanceof Element &&
							!node.hasAttribute("data-processed")
						) {
							node.setAttribute("data-processed", "true");
							clearTimeout(timeout);
							timeout = setTimeout(() => {
								callback();
							}, delay);
						}
					}
				}
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
	};

	onMounted(() => {
		observeAsyncComponents();
	});

	onUnmounted(() => {
		observer?.disconnect();
		if (timeout) clearTimeout(timeout);
	});
};

export default onAsyncMounted;
