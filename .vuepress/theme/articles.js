import { sortByDate, fetchPagesInArray, excludePages } from '@theme/utils';

export default ({ Vue }) => {
	Vue.mixin({
		computed: {
			$articles() {
				return this.$site.pages.filter((page) => page.isArticle && this.$lang === page.lang).sort(sortByDate);
			},
			$snippets() {
				return this.$site.pages.filter((page) => page.isSnippet).sort(sortByDate);
			},
			$featuredArticles() {
				const { minimumFeaturedArticles } = this.$themeConfig;

				const featuredArticles = this.$lang === 'ar' ? this.$themeConfig.arFeaturedArticles : this.$themeConfig.featuredArticles;

				let featured = fetchPagesInArray(this.$articles, featuredArticles);

				if (featured.length < minimumFeaturedArticles) {
					let moreFeatured = excludePages(this.$articles, featured).slice(0, minimumFeaturedArticles - featured.length);
					featured.push(...moreFeatured);
				}

				return featured;
			},
			$otherArticles() {
				return excludePages(this.$articles, this.$featuredArticles);
			},
		},
	});
};
