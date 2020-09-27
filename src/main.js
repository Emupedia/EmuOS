import App from './App.svelte';

console.log('%c  ╔═╗╔╦╗╦ ╦╔═╗╔═╗  \n' +
			  '  ╠═ ║║║║ ║║ ║╚═╗  \n' +
			  '  ╚═╝╩ ╩╚═╝╚═╝╚═╝ ', 'font-size: 20px; line-height: 1.12; color: #bada55; text-shadow: 2px 2px #f00, 2px 2px 25px #fff')

const app = new App({
	target: document.body
});

export default app;

if (import.meta.hot) {
	import.meta.hot.accept();
	import.meta.hot.dispose(() => {
		app.$destroy();
	});
}