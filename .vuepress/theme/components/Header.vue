<template>
	<header class="my-10">
		<router-link v-if="!noHome" tag="button" :to="$lang === 'ar' ? '/ar/' : '/'" class="flex items-center mb-2 group text-ternary focus:outline-none">
			<Icon icon="arrow-thin-left-circle" class="w-6 h-6 ltr:mr-1 rtl:ml-1" primary="text-white opacity-50 group-hover:opacity-100" secondary="group-hover:text-gray-900 text-ternary"></Icon>

			<div class="text-sm font-semibold tracking-wider uppercase group-hover:text-primary">Home</div>
		</router-link>

		<div class="text-4xl font-bold leading-tight text-primary md:text-5xl" v-text="effectiveTitle"></div>

		<div class="mt-3 font-serif text-lg font-medium text-secondary md:text-xl" v-if="effectiveSubtitle" v-text="effectiveSubtitle"></div>
	</header>
</template>

<script>
	export default {
		props: {
			title: String,
			subtitle: String,
			noHome: Boolean,
		},
		computed: {
			effectiveTitle() {
				return this.title || this.$page.title;
			},
			effectiveSubtitle() {
				return this.subtitle || this.$page.frontmatter.subtitle;
			},
		},
	};
</script>
