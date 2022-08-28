<svelte:options tag={null} />

<ul class="icons {$$props.class || ''}" {...$$restProps}><slot /></ul>

<style lang="scss">
	//noinspection CssOverwrittenProperties
	.icons {
		position: absolute;

		width: 100%;
		//height: 100%;
		height: calc(100% - 28px);

		display: grid;
		grid-template-columns: repeat(auto-fill, 70px);
		grid-template-rows: repeat(auto-fill, 70px);
		grid-auto-flow: column;
		//place-content: flex-start;
		//gap: 14px 1px;

		//contain: strict;

		overflow: hidden;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>