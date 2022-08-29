export const variables = {
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	PROD: import.meta.env.PROD,
	BASE_URL: import.meta.env.BASE_URL,
	GLOBAL_DEBUG: import.meta.env.VITE_GLOBAL_DEBUG === 'true',
	USE_WEBCOMPONENTS: import.meta.env.VITE_USE_WEBCOMPONENTS === 'true'
}

if (variables?.GLOBAL_DEBUG) {
	console.log(variables)
}