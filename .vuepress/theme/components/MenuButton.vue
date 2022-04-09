<template>
	<div class="group menu-button" @click="$emit('click')">
		<Icon icon="menu" class="w-5 sm:w-6" secondary="text-white group-hover:text-black" />
	</div>
</template>

<script>
	export default {
		//
	};
</script>

<style lang="stylus">
	corner-triangle(size, paddingTop, paddingRight)
	    width size
	    height size
	    border-style solid
	    border-width 0 size*2 size*2 0
	    border-color transparent theme('backgroundColor.brand') transparent transparent
	    position absolute
	    top 0
	    right 0
	    cursor pointer
	    > div
	        position absolute
	        top paddingTop
	        right paddingRight - (size * 2)

	.menu-button
	    corner-triangle(30px, 7px, 5px)
	    @media sm
	        corner-triangle(50px, 18px, 15px)
</style>
