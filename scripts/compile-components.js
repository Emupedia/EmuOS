import * as svelte from 'svelte/compiler'
import config from '../svelte.config.js'

const path = '../src/lib/components/Toasts/Toast.svelte'

console.log(svelte)
console.log(config)

const result = svelte.compile(path, { ...config.compilerOptions})

console.log(result)