const path = require('path');
const lastUpdateOptions = require('./theme/config-options/lastUpdateOptions.js');
const siteMapOptions = require('./theme/config-options/siteMapOptions.js');
const feedOptions = require('./theme/config-options/feedOptions.js');
const facebookPixelOptions = require('./theme/config-options/facebookPixelOptions.js');
const seoOptions = require('./theme/config-options/seoOptions.js');
const canconcialOptions = require('./theme/config-options/canconcialOptions.js');
const readingTimeOptions = require('./theme/config-options/readingTimeOptions.js');
const robotsOptions = require('./theme/config-options/robotsOptions.js');
const blogOptions = require('./theme/config-options/blogOptions.js');
const paginationOptions = require('./theme/config-options/paginationOptions.js');
const paginator = require('./theme/pagination/index');

module.exports = {
	title: 'Ahmed Nagi',
	plugins: [
		['@vuepress/last-updated', lastUpdateOptions],
		['sitemap', siteMapOptions],
		['check-md'],
		['feed', feedOptions],
		['vuepress-plugin-facebook-pixel', facebookPixelOptions],
		['vuepress-plugin-seo', seoOptions],
		['vuepress-plugin-canonical-with-pagination', canconcialOptions],
		['vuepress-plugin-reading-time', readingTimeOptions],
		['robots', robotsOptions],
		[paginator, paginationOptions],
		['@vuepress/blog', blogOptions],
		'disqus',
		'img-lazy',
		['@vuepress/plugin-google-analytics', { ga: 'UA-189097283-1' }],
		[
			'google-gtag',
			{
				ga: 'G-6V2PD0VWZE',
			},
		],
		require('./theme/extendPageData.js'),
	],
	locales: {
		'/ar/': {
			lang: 'ar',
			title: 'احمد ناجي',
			description: 'مطور مواقع ومساهم في البرامج مفتوحة المصدر. اشارك كل مااتعلمه على مدونتي وعلى تويتر.',
			date: new Date().toISOString(),
			lastUpdated: new Date().toISOString(),
		},
		'/': {
			lang: 'en',
			title: 'Ahmed Nagi',
			description: "Hey I'm Nagi @nagiworks, a full-stack developer and opensource contributor. I share everything I know about making awesome software through my blog, linkedin and twitter.",
			lastUpdated: new Date().toISOString(),
			date: new Date().toISOString(),
		},
	},

	postcss: {
		plugins: [require('postcss-import'), require('tailwindcss')(path.resolve(__dirname, '../tailwind.config.js')), require('autoprefixer')],
	},

	themeConfig: {
		domain: 'https://ahmednagi.com',

		repo: 'https://github.com/nagi1/ahmednagi.com',
		nav: ['/', '/tag/', '/all/snippets/', '/all/', '/facebook-group/'],
		// nav: ['/', '/tag/', '/all/snippets/', '/all/', '/work/', '/ar/work/'],
		author: {
			name: 'Ahmed Nagi',
			twitter: '@nagiworks',
		},
		articlesPerPage: 10,
		minimumFeaturedArticles: 10,

		featuredArticles: [
			'/getting-started-with-opensource/',
			'/90-days-to-web-dev-job/',
			'/crack-intelephense/',
			'/create-skeleton-loader-vuejs/',
			'/create-social-media-headers/',
			'/laravel-deploy-bitbucket/',
			'/hill-chart/',
			'/oilly-telegram-bot/',
		],
		arFeaturedArticles: ['/ar/getting-started-with-opensource/', '/ar/laravel-deploy-bitbucket/', '/ar/90-days-to-web-dev-job/', '/ar/5-steps-to-read-programming-books/'],
	},
	head: [
		['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
		['link', { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' }],
		['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
		['meta', { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' }],
		['meta', { name: 'theme-color', content: '#ffffff' }],
	],

	markdown: {
		toc: { includeLevel: [1, 2, 3] },
	},
};
