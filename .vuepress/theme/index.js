const path = require('path');
const moment = require('moment');

module.exports = {
	plugins: [
		[
			'@vuepress/last-updated',
			{
				transformer: (timestamp, lang) => {
					moment.locale('en-US');
					return moment(timestamp).fromNow();
				},
				dateOptions: {
					hour12: true,
				},
			},
		],
		['@vuepress/plugin-google-analytics', { ga: 'UA-189097283-1' }],
		[
			'google-gtag',
			{
				ga: 'G-6V2PD0VWZE',
			},
		],

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
				url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
				image: ($page, $site) => ($page.frontmatter.image ? $site.themeConfig.domain + $page.frontmatter.image : $site.themeConfig.domain + '/uploads/ahmednagi.png'),
				publishedAt: ($page) => $page.frontmatter.date && new Date($page.frontmatter.date),
				modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
			},
		],
		'disqus',
		require('./extendPageData.js'),
	],
	enhanceAppFiles: [path.resolve(__dirname, 'articles.js'), path.resolve(__dirname, 'search.js')],
};
