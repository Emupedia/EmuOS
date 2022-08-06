<script context="module">
	export const load = ({ error, status }) => {
		if (status === 404) {
			return {
				status: 302,
				redirect: '/'
			}
		}

		return {
			props: { error, status }
		}
	}
</script>

<script>
	export let error
	export let status
</script>

<svelte:head>
	<title>EmuOS v2.0 - Error!</title>
</svelte:head>

<table class="error">
	<tbody>
	<tr>
		<td>
			<div class="error-wrapper">
				<h1>The page you are looking for is temporarily unavailable!</h1>
				<h2>
					Sorry, the page you are looking for is currently unavailable, please try again later.<br />
					These errors are monitored and will be fixed as soon as posible.<br />
					Thank you for understanding!
				</h2>
				<div class="error-container">
					<video muted autoplay loop controls>
						<source src="assets/videos/monkey.mp4" type="video/mp4">
						<source src="assets/videos/monkey.ogg" type="video/ogg">
						<img src="assets/videos/monkey.jpg" alt="" />
					</video>
				</div>
				<div class="error-caption">A team of highly trained monkeys has been dispatched to deal with this situation.</div>
			</div>
		</td>
	</tr>
	</tbody>
</table>

<div class="max-w-screen-xl container mx-auto grid place-items-center">
	<section class="p-8 border-gray-500 rounded">
		<h1 class="text-center text-4xl font-mono-mt-4">{status}</h1>
		<p class="text-center">{error.message}</p>
	</section>
</div>

<style lang="scss">
	html {
		height: 100%;
	}

	body {
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	table {
		&.error {
			width: 100%;
			height: 100%;
			background-color: #fff;
			background-image: url(assets/images/clouds.png);
			background-repeat: repeat-x;
			margin: auto;
			border: none;
			border-collapse: collapse;
			border-spacing: 0;
			text-align: center;
			text-rendering: optimizelegibility;

			h1 {
				color: #ee465a;
				text-shadow: 0 1px 3px rgba(0, 0, 0, .4), 0 0 30px rgba(0, 0, 0, .075);
			}

			h2 {
				color: #777;
				font-size: 16px;
				font-weight: normal;
			}

			video {
				display: block;
				width: 800px;
				height: auto;
				outline: none;
			}

			div {
				&.error-wrapper {
					width: 804px;
					margin: auto;
				}

				&.error-container {
					background-color: #000;
					border: 2px solid #000;
				}

				&.error-caption {
					width: auto;
					height: 22px;
					margin: auto;
					background-color: #000;
					font-size: 18px;
					line-height: 18px;
					color: #fff;
				}
			}
		}
	}
</style>