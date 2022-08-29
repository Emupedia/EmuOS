export * from './lib/components/Counter.svelte'
export * from './lib/components/Toasts/Toast.svelte'
export * from './lib/components/Toasts/Toasts.svelte'

let count = 0

const counter = document.getElementsByTagName('my-counter')[0]
const toasts = document.getElementsByTagName('emuos-toasts')[0]

counter.addEventListener('click', () => {
	// noinspection JSCheckFunctionSignatures
	counter.setAttribute('count', count++)
	// noinspection JSUnresolvedVariable
	toasts.toast.open({ msg: `You clicked ${count} times`, initial: 1, pausable: true })
})