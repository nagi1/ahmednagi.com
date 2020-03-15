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
					hostname: 'https://lorisleiva.com',
				},
				feed: {
					canonical_base: 'https://lorisleiva.com',
				},
			},
		],
		'seo',
		'disqus',
		require('./extendPageData.js'),
		'@silvanite/tailwind',
	],
	enhanceAppFiles: [path.resolve(__dirname, 'articles.js'), path.resolve(__dirname, 'search.js')],
};
