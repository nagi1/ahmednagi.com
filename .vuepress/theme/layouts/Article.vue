<template>
	<div class="flex flex-col">
		<!-- Progress bar and share buttons. -->
		<FloatingHeader />

		<!-- Article. -->
		<article class="bg-body">
			<div class="container">
				<Header />

				<ArticleMetaData />
			</div>

			<Content />
		</article>

		<!-- Subscription form. -->
		<div class="py-8 pt-8 bg-ternary">
			<div class="container sm:px-10">
				<SubscribeForm />
			</div>
		</div>

		<!-- Disqus. -->
		<div class="py-16 bg-primary">
			<div class="container py-4 sm:py-8">
				<h2>{{ $lang === 'ar' ? 'التعليقات' : 'Comments' }}</h2>
				<Disqus shortname="ahmednagi" :title="$page.title" :identifier="disqusIdentifier" :url="disqusUrl" />
			</div>
		</div>

		<!-- Related articles. -->
		<div v-if="relatedArticles.length >= 1" class="bg-primary">
			<div class="container py-4 sm:py-8">
				<h2>{{ $lang === 'ar' ? 'اقرأ ايضا' : 'Read more' }}</h2>
				<div class="flex flex-wrap -mx-5">
					<ArticleCard v-for="article in relatedArticles" :key="article.key" :article="article" class="mx-5 mb-8" style="flex: 1 1 300px" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { randomElements, excludePages } from '@theme/utils';
	import Header from '@theme/components/Header';
	import FloatingHeader from '@theme/components/FloatingHeader';
	import ArticleMetaData from '@theme/components/ArticleMetaData';
	import SubscribeForm from '@theme/components/SubscribeForm';
	import ArticleCard from '@theme/components/ArticleCard';

	export default {
		components: { Header, FloatingHeader, ArticleMetaData, SubscribeForm, ArticleCard },
		computed: {
			disqusIdentifier() {
				return this.$page.frontmatter.disqus || this.$page.path;
			},
			disqusUrl() {
				return this.$themeConfig.domain + this.$page.path;
			},
			relatedArticles() {
				const tags = this.$page.frontmatter.tags || [];
				const relatedArticles = this.$articles.filter((a) => (a.frontmatter.tags || []).some((tag) => tags.includes(tag)));

				return randomElements(excludePages(relatedArticles, [this.$page]), 2);
			},
		},
	};
</script>
