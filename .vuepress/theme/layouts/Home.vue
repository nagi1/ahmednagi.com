<template>
	<div class="bg-body">
		<div class="container-xl">
			<Header no-home />

			<!-- Subscription form. -->

			<ArticleGrid :articles="$featuredArticles" />

			<Pagination :paginatorInstance="$paginator" />

			<div dir="ltr" class="py-8 pt-8 mb-8 shadow-lg rounded-xl bg-ternary">
				<div class="container sm:px-10">
					<SubscribeForm />
				</div>
			</div>

			<div class="flex flex-col items-center justify-center mb-16 sm:flex-row">
				<a class="text-lg font-semibold text-primary" href="#" @click.prevent="$parent.$refs.navigator.open()">{{ search }}</a>

				<div class="px-2 py-2">
					<Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
				</div>

				<router-link class="text-lg font-semibold text-primary" to="/tag/">{{ tags.text }}</router-link>

				<div class="px-2 py-2">
					<Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
				</div>

				<router-link class="text-lg font-semibold text-primary" :to="all.link">{{ all.text }}</router-link>

				<div class="px-2 py-2">
					<Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
				</div>

				<router-link class="text-2xl font-semibold text-primary" :to="snippets.link">{{ snippets.text }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@theme/components/Header';
	import ArticleGrid from '@theme/components/ArticleGrid';
	import SubscribeForm from '@theme/components/SubscribeForm';
	import Pagination from '@theme/components/Pagination';

	export default {
		components: { Header, ArticleGrid, SubscribeForm, Pagination },

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
