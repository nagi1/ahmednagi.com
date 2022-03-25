<template>
	<div class="flex flex-col">
		<!-- Progress bar and share buttons. -->
		<FloatingHeader />

		<!-- Article. -->
		<article class="bg-body">
			<div class="container">
				<Header />
				<articleMetaData />
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
	</div>
</template>

<script>
	import Header from '@theme/components/Header';
	import FloatingHeader from '@theme/components/FloatingHeader';
	import ArticleMetaData from '@theme/components/ArticleMetaData';
	import SubscribeForm from '@theme/components/SubscribeForm';

	export default {
		components: { Header, FloatingHeader, ArticleMetaData, SubscribeForm },
		computed: {
			disqusIdentifier() {
				return this.$page.frontmatter.disqus || this.$page.path;
			},
			disqusUrl() {
				return this.$themeConfig.domain + this.$page.path;
			},
		},
	};
</script>
