export * from './lib/components/Counter.svelte'
export * from './lib/components/Toasts/Toast.svelte'
export * from './lib/components/Toasts/Toasts.svelte'

import { toast } from './lib/stores/db'

window.toast = toast

toast.open({ msg: 'This is a toast!', pausable: true })

export { toast }