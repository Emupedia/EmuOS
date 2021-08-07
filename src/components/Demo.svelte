<script>
	import Moveable from 'svelte-moveable'
	import Guides from 'svelte-guides'
	import { onMount } from 'svelte'
	import { Frame } from 'scenejs'
	import keycon from 'keycon'

	const KeyController = keycon.setGlobal()
	const frameMap = new Map()
	let targets = []
	let moveable
	let scroller
	let guides1
	let guides2
	let horizontalGuidelines
	let verticalGuidelines
	let throttleRotate = 0
	let target1
	let target2
	let target3

	function newFrame(el) {
		const frame = new Frame({
			transform: {
				translateX: "0px",
				translateY: "0px",
				rotate: "0deg",
				scaleX: 1,
				scaleY: 1
			}
		})

		frameMap.set(el, frame)

		return frame
	}

	function getFrame(target) {
		return frameMap.get(target) || newFrame(target)
	}

	function onRender({ target }) {
		target.style.cssText += getFrame(target).toCSS()
	}

	function onDragStart({ target, set }) {
		const frame = getFrame(target)

		set([
			parseFloat(frame.get("transform", "translateX")),
			parseFloat(frame.get("transform", "translateY"))
		])
	}

	function onDrag({ target, beforeTranslate }) {
		const frame = getFrame(target)

		frame.set("transform", "translateX", `${beforeTranslate[0]}px`)
		frame.set("transform", "translateY", `${beforeTranslate[1]}px`)
	}

	function onScaleStart({ target, dragStart, set }) {
		const frame = getFrame(target)
		set([frame.get("transform", "scaleX"), frame.get("transform", "scaleY")])
		dragStart && onDragStart(dragStart)
	}

	function onScale({ target, scale, drag }) {
		const frame = getFrame(target)

		frame.set("transform", "scaleX", scale[0])
		frame.set("transform", "scaleY", scale[1])

		onDrag(drag)
	}

	function onRotateStart({ target, set, dragStart }) {
		const frame = getFrame(target)
		set(parseFloat(frame.get("transform", "rotate")))

		dragStart && onDragStart(dragStart)
	}

	function onRotate({ target, beforeRotate, drag }) {
		const frame = getFrame(target)

		frame.set("transform", "rotate", `${beforeRotate}deg`)

		drag && onDrag(drag)
	}

	function onMouseDown(e) {
		const target = e.target
		if (scroller === target) {
			targets = []
			return
		}
		if (moveable.isMoveableElement(target) || targets.indexOf(target) > -1) {
			return
		}
		if (KeyController.shiftKey) {
			targets = [...targets, target]
		} else {
			targets = [target]
		}

		setTimeout(() => {
			moveable.dragStart(e)
		})
	}

	function onClickGroup(e) {
		const target = e.inputTarget

		if (!target.classList.contains("target")) {
			return
		}
		const index = targets.indexOf(target)
		if (KeyController.shiftKey) {
			if (index === -1) {
				targets = [...targets, target]
			} else {
				targets.splice(index, 1)
				targets = [...targets]
			}
		} else {
			targets = [target]
		}
	}

	function onWindowResize() {
		guides1.resize()
		guides2.resize()
	}

	function setGuides() {
		horizontalGuidelines = [
			...guides1.getGuides(),
			(window.innerHeight - 30) / 2
		]
		verticalGuidelines = [...guides2.getGuides(), (window.innerWidth - 30) / 2]
	}

	function onShift() {
		throttleRotate = KeyController.shiftKey ? 30 : 0
	}

	onMount(() => {
		const left = (window.innerWidth - 30) / 2 - 100
		const top = (Math.max(window.innerHeight, 700) - 30) / 2 - 75 - 200
		setGuides()

		target1.style.cssText += `left: ${left - 200}px;top: ${top}px`
		target2.style.cssText += `left: ${left + 150}px;top: ${top - 50}px`
		target3.style.cssText += `left: ${left}px;top: ${top + 200}px`
		requestAnimationFrame(() => {
			targets = [document.querySelector(".target")]

			onWindowResize()
		})
		KeyController.keydown("shift", onShift)
		KeyController.keyup("shift", onShift)

		/*let scrollX = 0
		let scrollY = 0

		window.addEventListener("wheel", e => {
			scrollX += e.deltaX
			scrollY += e.deltaY

			guides1.scrollGuides(scrollY)
			guides1.scroll(scrollX)

			guides2.scrollGuides(scrollY)
			guides2.scroll(scrollX)
		});*/
	});
</script>

<style>
	@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap");
	@import url("https://fonts.googleapis.com/css?family=Roboto:100&display=swap");

	:global(html), :global(body) {
		font-family: "Open Sans", sans-serif;
		position: relative;
		margin: 0;
		padding: 0;
		height: 100%;
		color: #333;
		letter-spacing: 1px;
		background: #f5f5f5;
		font-weight: 300;
		touch-action: manipulation;
	}

	:global(.moveable) {
		z-index: 10;
	}

	.page {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 700px;
	}

	.scroller {
		position: absolute;
		left: 30px;
		top: 30px;
		width: calc(100% - 30px);
		height: calc(100% - 30px);
		-webkit-user-select: none; /* Chrome all / Safari all */
		-moz-user-select: none; /* Firefox all */
		-ms-user-select: none; /* IE 10+ */
		user-select: none; /* Likely future */
		overflow: hidden;
	}

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

	.target:nth-child(1) {
		top: 100px;
		left: 100px;
	}

	.target:nth-child(2) {
		top: 50px;
		left: 300px;
	}

	.target:nth-child(3) {
		top: 250px;
		left: 200px;
	}

	.ruler {
		position: absolute;
		top: 0;
		left: 0;
	}

	.ruler.horizontal {
		left: 0;
		width: 100%;
		height: 30px;
	}

	.ruler.vertical {
		top: 0;
		width: 30px;
		height: 100%;
	}

	.box {
		position: relative;
		width: 30px;
		height: 30px;
		background: #444;
		box-sizing: border-box;
		z-index: 1;
	}

	.box:before, .box:after {
		position: absolute;
		content: "";
		background: #777;
	}

	.box:before {
		width: 1px;
		height: 100%;
		left: 100%;
	}

	.box:after {
		height: 1px;
		width: 100%;
		top: 100%;
	}
</style>

<svelte:window on:resize={onWindowResize} />

<div class="page">
	<div class="box"></div>
	<div class="ruler horizontal">
		<Guides
			bind:this={guides1}
			type="horizontal"
			backgroundColor="#444"
			rulerStyle={{ left: '30px', width: 'calc(100% - 30px)', height: '30px' }}
			{setGuides} />
	</div>
	<div class="ruler vertical">
		<Guides
			bind:this={guides2}
			type="vertical"
			backgroundColor="#444"
			rulerStyle={{ top: '30px', height: 'calc(100% - 30px)', width: '30px' }}
			{setGuides} />
	</div>
	<div class="scroller" bind:this={scroller} on:mousedown={onMouseDown}>
		{#if scroller}
			<Moveable
				container={scroller}
				className="moveable"
				bind:this={moveable}
				target={targets}
				draggable={true}
				scalable={true}
				rotatable={true}
				snappable={true}
				snapCenter={true}
				{throttleRotate}
				{horizontalGuidelines}
				{verticalGuidelines}
				on:dragStart={({ detail }) => {
					onDragStart(detail);
				}}
				on:drag={({ detail }) => {
					onDrag(detail);
				}}
				on:dragGroupStart={({ detail }) => {
					detail.events.forEach(onDragStart);
				}}
				on:dragGroup={({ detail }) => {
					detail.events.forEach(onDrag);
				}}
				on:scaleStart={({ detail }) => onScaleStart(detail)}
				on:scale={({ detail }) => onScale(detail)}
				on:scaleGroupStart={({ detail }) => {
					detail.events.forEach(onScaleStart);
				}}
				on:scaleGroup={({ detail }) => {
					detail.events.forEach(onScale);
				}}
				on:rotateStart={({ detail }) => onRotateStart(detail)}
				on:rotate={({ detail }) => onRotate(detail)}
				on:rotateGroupStart={({ detail }) => {
					detail.events.forEach(onRotateStart);
				}}
				on:rotateGroup={({ detail }) => {
					detail.events.forEach(onRotate);
				}}
				on:render={({ detail }) => {
					onRender(detail);
				}}
				on:renderGroup={({ detail }) => {
					detail.targets.forEach(target => onRender({ target }));
				}}
				on:clickGroup={({ detail }) => {
					onClickGroup(detail);
				}} />
		{/if}
		<div class="target" bind:this={target1}>Moveable1</div>
		<div class="target" bind:this={target2}>Moveable2</div>
		<div class="target" bind:this={target3}>Moveable3</div>
	</div>
</div>