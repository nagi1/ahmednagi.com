<template>
	<header class="my-10">
		<router-link v-if="!noHome" tag="button" :to="$lang === 'ar' ? '/ar/' : '/'" class="flex items-center mb-2 group text-primary focus:outline-none">
			<Icon icon="arrow-thin-left-circle" class="w-6 h-6 ltr:mr-1 rtl:ml-1" primary="text-white opacity-50 group-hover:opacity-100" secondary="group-hover:text-gray-900 text-primary"></Icon>

			<div class="text-sm font-semibold tracking-wider uppercase group-hover:text-primary">{{ $t('header.home') }}</div>
		</router-link>

		<h1 class="text-4xl font-bold leading-relaxed text-primary" v-text="effectiveTitle"></h1>

		<div class="mt-3 text-lg font-medium text-secondary md:text-xl" v-if="effectiveSubtitle" v-text="effectiveSubtitle"></div>
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
