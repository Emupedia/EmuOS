<svelte:options tag={null} />

<svelte:head>
	<title>EmuOS v2.0 - BlueScreen!</title>
</svelte:head>

<script>
	import { page } from '$app/stores'
	import { variables } from '$lib/variables'

	export let data = {}
	export let errors = {}

	if (variables?.GLOBAL_DEBUG) {
		console.log('+error.svelte')

		if (data && Object.keys(data).length > 0) {
			console.log(data)
		}

		if (errors && Object.keys(errors).length > 0) {
			console.log(errors)
		}

		console.log($page)
	}
</script>

<table class="error">
	<tbody>
		<tr>
			<td>
				<div class="error-wrapper">
					<h1 class="error-title">Windows</h1>
					<div class="error-container">
						<br />An exception 0D has occurred at 0028:00000003 in VxD ---.&nbsp;&nbsp;This was<br />
						called from 0028:C1823C80 in VxD CDFS(03) + 000085C0.&nbsp;&nbsp;It may be<br />
						possible to continue normally.<br />
						<br />
						*&nbsp;&nbsp;Press any key to attempt to continue.<br />
						*&nbsp;&nbsp;Press CTRL+ALT+DEL to restart your computer.&nbsp;&nbsp;You will<br />
						&nbsp;&nbsp;&nbsp;lose any unsaved information in all applications.<br />
						<br />
					</div>
					<h2 class="error-cto">Press any key to continue</h2>
				</div>
			</td>
		</tr>
	</tbody>
</table>

<style lang="scss">
	.error {
		width: 100%;
		height: 100%;

		border: none;
		border-collapse: collapse;
		border-spacing: 0;

		margin: auto;

		background-color: #00a;
		color: #fff;
		font-family: 'DOSVGA', monospace;
		font-size: 16px;
		line-height: 16px;
		text-align: center;

		text-rendering: optimizeLegibility;
		-webkit-text-size-adjust: none;
		text-size-adjust: none;
		-webkit-font-smoothing: none;
		-moz-osx-font-smoothing: grayscale;
		font-smooth: never;

		.error-title {
			display: inline;
			background-color: #aaa;
			color: #00a;
			font-size: 16px;
			font-weight: normal;

			padding-left: 8px;
			padding-right: 8px;
		}

		.error-container {
			width: 568px;
			margin: auto;
			text-align: left;
		}

		.error-cto {
			font-size: 16px;
			font-weight: normal;
		}
	}

</style>