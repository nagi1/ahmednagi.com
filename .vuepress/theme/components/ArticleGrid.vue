<template>
	<section class="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
		<ArticleCard :article="featuredArticle" class="sm:col-span-2" featured />
		<ArticleCard v-for="article in otherArticles" :key="article.key" :article="article" />
	</section>
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
			otherArticles() {
				return excludePages(this.articles, [this.featuredArticle]);
			},
		},
	};
</script>
