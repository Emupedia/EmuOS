<script>
	import { browser } from '$app/env'
	import '../main.scss'

	if (browser) {
		console.log('%c                                 \n' +
			'                                 \n' +
			'     ╔═╗╔╦╗╦ ╦╔═╗╔═╗╔╦═╗╦╔═╗     \n' +
			'     ╠═ ║║║║ ║╠═╝╠═  ║ ║║╠═╣     \n' +
			'     ╚═╝╩ ╩╚═╝╩  ╚═╝═╩═╝╩╩ ╩     \n' +
			'          ╔═╗╔╦╗╦ ╦╔═╗╔═╗        \n' +
			'          ╠═ ║║║║ ║║ ║╚═╗        \n' +
			'          ╚═╝╩ ╩╚═╝╚═╝╚═╝        \n' +
			'               v2.0              \n' +
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

<header></header>

<main>
	<slot />
</main>

<footer></footer>