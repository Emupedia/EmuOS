export * from './lib/components/Counter.svelte'
export * from './lib/components/Toasts/Toast.svelte'
export * from './lib/components/Toasts/Toasts.svelte'

import { toast } from './lib/stores/db'

window.toast = toast

export { toast }

let count = 0

const counter = document.getElementById('counter')

counter.addEventListener('click', () => {
	// noinspection JSCheckFunctionSignatures
	counter.setAttribute('count', count++)
	toast.open({ msg: `You clicked ${count} times`, initial: 0, pausable: true })
})