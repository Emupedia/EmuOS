<svelte:options tag={null} />

<script>
	import { browser } from '$app/environment'
	import { variables } from '$lib/variables'

	import '../main.scss'

	export let data = {}
	export let errors = {}

	if (variables?.GLOBAL_DEBUG) {
		console.log('+layout.svelte')

		if (data && Object.keys(data).length > 0) {
			console.log(data)
		}

		if (errors && Object.keys(errors).length > 0) {
			console.log(errors)
		}
	}

	if (browser) {
		console.log('%c                                 \n' +
			'                                 \n' +
			'     ╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗     \n' +
			'     ╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣     \n' +
			'     ╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩     \n' +
			'         ╔═╗╔╦╗╦ ╦╔═╗╔═╗         \n' +
			'         ╠═ ║║║║ ║║ ║╚═╗         \n' +
			'         ╚═╝╩ ╩╚═╝╚═╝╚═╝         \n' +
			'              v2.0               \n' +
			'                                 \n', 'background: radial-gradient(circle, #1a2049 0%, #13162f 100%); font-size: 20px; line-height: 1; color: yellow; text-shadow: 1px 1px #5B4FFF;')
		console.log('%cHold Up!', 'background: linear-gradient(#D33106, #571402); color: #5865f2; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;')
		console.log('%cIf someone told you to enter or copy/paste something here it\'s very likely you\'re being scammed.', 'font-size: 16px;')
		console.log('%cPasting anything in here could give attackers access to your data.', 'font-size: 18px; font-weight: bold; color: #D50012;')
		console.log('%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.', 'font-size: 18px; font-weight: bold; color: #D50012;')
		console.log('%cYou can read more about it here => https://en.wikipedia.org/wiki/Self-XSS', 'font-size: 18px; font-weight: bold; color: #D9A343;')
		console.log('%cDo not enter or paste code that you do not understand.', 'font-size: 18px; font-weight: bold; color: #D50012;')
		console.log('%cUnless you understand exactly what you are doing, close this window and stay safe.', 'font-size: 16px; color: #00A478;')
	}
</script>

<slot />