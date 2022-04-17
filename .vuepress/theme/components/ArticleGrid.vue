<template>
	<div class="flex flex-col">
		<section class="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
			<ArticleCard :article="featuredArticle" class="sm:col-span-2" featured />
			<ArticleCard v-for="article in otherArticles" :key="article.key" :article="article" />
		</section>
		<router-link class="self-center mb-3 text-3xl font-semibold justify-self-center" :to="all.link">{{ all.text }}</router-link>
	</div>
</template>

<script>
	import { excludePages } from '@theme/utils';
	import ArticleCard from '@theme/components/ArticleCard';

	export default {
		props: {
			articles: Array,
			featured: String,
		},
		components: { ArticleCard },
		computed: {
			featuredArticle() {
				return this.articles[0];
			},
			all() {
				return {
					text: this.$lang === 'ar' ? 'تصفح كل المقالات' : 'All Posts',
					link: this.$lang === 'ar' ? '/ar/all' : '/all',
				};
			},
			otherArticles() {
				return excludePages(this.articles, [this.featuredArticle]);
			},
		},
	};
</script>
