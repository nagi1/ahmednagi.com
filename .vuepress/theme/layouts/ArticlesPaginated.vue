<template>
	<div class="bg-primary">
		<div class="container-xl">
			<Header :title="subtitle" />
			<ArticleGrid :articles="articles" />
			<Pagination :paginatorInstance="paginatorInstance" />
		</div>
	</div>
</template>

<script>
	import Header from '@theme/components/Header';
	import ArticleGrid from '@theme/components/ArticleGrid';
	import Pagination from '@theme/components/Pagination';

	export default {
		components: { Header, ArticleGrid, Pagination },

		computed: {
			paginatorInstance() {
				return this.$pagination ? this.$pagination : this.$paginator;
			},
			articles() {
				return this.paginatorInstance.posts ? this.paginatorInstance.posts : this.paginatorInstance.pages;
			},
			paginationIndex() {
				const index = this.paginatorInstance ? this.paginatorInstance.paginationIndex : 0;
				return index;
			},
			subtitle() {
				if (this.paginatorInstance && this.paginationIndex > 0) {
					return `${this.$t('pagination.page')} ${this.paginationIndex + 1}`;
				}
			},
		},
	};
</script>
