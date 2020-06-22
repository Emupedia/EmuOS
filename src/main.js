import EmuOS from './EmuOS.svelte';

const emuos = new EmuOS({
	target: document.body
});

export default emuos;

if (import.meta.hot) {
	import.meta.hot.accept();
	import.meta.hot.dispose(() => {
		emuos.$destroy();
	});
}