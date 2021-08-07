<style>
	.target {
		position: absolute;
		width: 200px;
		height: 150px;
		line-height: 150px;
		border: 1px solid #333;
		font-size: 30px;
		text-align: center;
		box-sizing: border-box;
		z-index: 20;
	}
</style>

<script>
	import Moveable from 'svelte-moveable'

	let target
</script>

<div class="target" bind:this={target}>Window</div>

<Moveable
	target={target}
	origin={true}
	edge={false}
	draggable={true}
	throttleDrag={0}
	keepRatio={false}
	renderDirections={["nw", "ne", "sw", "se", "n", "w", "s", "e"]}
	resizable={true}
	throttleResize={0}
	scalable={false}
	throttleScale={0}
	rotatable={false}
	throttleRotate={0}
	warpable={false}
	pinchable="false"
/>