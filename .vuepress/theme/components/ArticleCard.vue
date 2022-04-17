<template>
	<router-link
		class="relative z-10 flex flex-col no-underline rounded-lg cursor-pointer article-card hover:no-underline"
		style="min-height: 16rem"
		:class="featured ? 'border-0' : 'border border-gray-300'"
		:to="article.path"
	>
		<figure class="relative overflow-hidden bg-center bg-cover" :class="featured ? 'h-full min-h-72 rounded-lg' : 'h-48 rounded-t-lg'" :style="`background-image: url(${article.frontmatter.image})`">
			<div v-if="featured" class="absolute inset-x-0 bottom-0 p-6 pt-20 text-white" style="background-image: linear-gradient(to top, rgba(74, 85, 104, 0.6) 40%, rgba(0, 0, 0, 0) 100%)">
				<div class="mb-2 text-xs font-semibold tracking-wider uppercase" v-text="article.frontmatter.tags[0]"></div>
				<div class="font-sans text-2xl font-semibold leading-tight border-0" v-text="article.title"></div>
			</div>
		</figure>

		<main class="flex flex-col flex-1 p-6 no-underline rounded-b-lg bg-primary" v-if="!featured">
			<header>
				<div class="p-1 mb-2 text-xs font-semibold tracking-wider no-underline uppercase hover:no-underline text-ternary" v-text="article.frontmatter.tags[0]"></div>
				<div class="mb-2 font-sans text-lg font-semibold leading-tight border-0 text-primary" v-text="article.title"></div>
			</header>
			<section class="font-sans text-ternary" v-text="article.frontmatter.description"></section>
		</main>
		<div v-if="article.frontmatter.ribbon" :class="ribbonClass">
			<span v-text="article.frontmatter.ribbon"></span>
		</div>
	</router-link>
</template>

<script>
	export default {
		props: {
			article: Object,
			featured: Boolean,
		},
		computed: {
			ribbonClass() {
				switch (this.article.frontmatter.ribbon) {
					case 'popular':
						return 'ribbon river';
					case 'new':
						return 'ribbon topaz';
					default:
						return 'ribbon river';
				}
			},
		},
	};
</script>

<style lang="stylus">
	.article-card
	    transition all 0.4s ease
	    &:hover
	        transform translate3D(0, -1px, 0) scale(1.02)
	    &:before
	        content ""
	        position absolute
	        top 10px
	        right 10px
	        bottom 0
	        left 10px
	        border-radius 10px
	        box-shadow 0 10px 10px rgba(0,0,0,0.08),0 0 0 transparent
	        transition all .25s cubic-bezier(.02,.01,.47,1)
	        z-index -1
	    &:hover:before
	        box-shadow 0 4px 60px 0 rgba(0,0,0,0.2),0 0 0 transparent
</style>
