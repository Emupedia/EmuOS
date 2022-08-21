import { variables } from '$lib/variables'

const GLOBAL_TIMEOUT = 500
const GLOBAL_RETRIES = 1
const GLOBAL_RETRY_DELAY = 100

const delay = delay => new Promise(resolve => setTimeout(() => resolve(), delay))

const fetchWithTimeout = async (resource, options = {}, f) => {
	//console.log(`fetchWithTimeout(${resource})`)

	let id = null
	let response

	if (typeof AbortController === 'function') {
		const { timeout = GLOBAL_TIMEOUT } = options
		const controller = new AbortController()
		id = setTimeout(() => controller.abort(), timeout)

		if (typeof f === 'function') {
			//console.log(`Server-side fetch ${resource}`)
			response = await f(resource, { ...options, signal: controller.signal })
		} else {
			response = await fetch(resource, { ...options, signal: controller.signal })
		}
	} else {
		if (typeof f === 'function') {
			//console.log(`Server-side fetch ${resource}`)
			response = await f(resource, options)
		} else {
			response = await fetch(resource, options)
		}
	}

	if (id !== null) {
		clearTimeout(id)
	}

	return response
}

const fetchWithRetryDelay = async (resource, options = {}, f, n = GLOBAL_RETRIES) => {
	//console.log(`fetchWithRetryDelay(${resource})`)

	try {
		return await fetchWithTimeout(resource, options, f)
	} catch(error) {
		console.error(error)

		if (n === 1) throw error

		await delay(GLOBAL_RETRY_DELAY)

		return fetchWithRetryDelay(resource, options, f, n - 1)
	}
}

export const getSettings = (f, options) => fetchWithRetryDelay(`${f ? variables.API_ROOT : variables.API_ROOT}/settings`, options, f)
export const getUpdates = (f, options) => fetchWithRetryDelay('https://api.github.com/repos/Emupedia/EmuOS/commits/main', options, f)