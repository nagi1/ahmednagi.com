<template>
	<div class="bg-body">
		<div class="container-xl">
			<Header no-home />
			<ArticleGrid :articles="$featuredArticles" />
			<div class="flex flex-col sm:flex-row items-center justify-center mb-16">
				<a class="text-primary text-lg font-semibold" href="#" @click.prevent="$parent.$refs.navigator.open()">{{ search }}</a>
				<div class="px-2 py-2">
					<Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
				</div>
				<router-link class="text-primary text-lg font-semibold" to="/tag/">{{ tags.text }}</router-link>
				<div class="px-2 py-2">
					<Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
				</div>
				<router-link class="text-primary text-lg font-semibold" :to="all.link">{{ all.text }}</router-link>
				<div class="px-2 py-2">
					<Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
				</div>
				<router-link class="text-primary text-2xl font-semibold" :to="snippets.link">{{ snippets.text }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@theme/components/Header';
	import ArticleGrid from '@theme/components/ArticleGrid';

	export default {
		components: { Header, ArticleGrid },

		computed: {
			search() {
				return this.$lang === 'ar' ? 'البحث' : 'Search';
			},

			tags() {
				return {
					text: this.$lang === 'ar' ? 'استعراض التاجات' : 'Browse by tags',
					link: '/tag/',
				};
			},

			all() {
				return {
					text: this.$lang === 'ar' ? 'تصفح كل المقالات' : 'List all articles',
					link: this.$lang === 'ar' ? '/ar/all' : '/all',
				};
			},
			snippets() {
				return {
					text: this.$lang === 'ar' ? 'الحلول' : 'List all snippets',
					link: '/all/snippets/',
				};
			},
		},
	};
</script>
