const path = require('path');

module.exports = {
	plugins: [
		['@vuepress/google-analytics', { ga: 'UA-100767601-5' }],

		[
			'@vuepress/blog',
			{
				frontmatters: [
					{
						id: 'tag',
						title: 'Tag',
						keys: ['tags'],
						path: '/tag/',
						layout: 'Tags',
						scopeLayout: 'ArticlesPaginated',
						pagination: {
							layout: 'ArticlesPaginated',
							getPaginationPageTitle: (_, key) => `${key} Tag`,
						},
					},
				],
				globalPagination: {
					lengthPerPage: 10,
				},
				sitemap: {
					hostname: 'https://ahmednagi.com',
				},
				feed: {
					canonical_base: 'https://ahmednagi.com',
				},
			},
		],
		[
			'seo',
			{
				image: ($page, $site) => $site.themeConfig.domain + $page.frontmatter.image,
			},
		],
		'disqus',
		require('./extendPageData.js'),
	],
	enhanceAppFiles: [path.resolve(__dirname, 'articles.js'), path.resolve(__dirname, 'search.js')],
};
