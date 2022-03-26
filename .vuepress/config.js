module.exports = {
	title: 'Ahmed Nagi',
	plugins: [
		[
			'@vuepress/last-updated',
			{
				transformer: (timestamp, lang) => {
					return new Date(timestamp).toLocaleDateString();
				},
				dateOptions: {
					hour12: true,
				},
			},
		],
		[
			'sitemap',
			{
				hostname: 'https://ahmednagi.com',
			},
		],
		[
			'feed',
			{
				canonical_base: 'https://ahmednagi.com',
			},
		],
		[
			'vuepress-plugin-seo',
			{
				image: ($page, $site) => ($page.frontmatter.image ? $site.themeConfig.domain + $page.frontmatter.image : $site.themeConfig.domain + '/uploads/ahmednagi.png'),
			},
		],
		[
			'vuepress-plugin-canonical-with-pagination',
			{
				baseURL: 'https://ahmednagi.com', // base url for your schema, mandatory, default: ''
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
			},
		],
		'disqus',

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
		plugins: [require('tailwindcss')('./tailwind.config.js'), require('autoprefixer')],
	},
	themeConfig: {
		domain: 'https://ahmednagi.com',

		repo: 'https://github.com/nagi1/ahmednagi.com',
		nav: ['/', '/tag/', '/all/snippets/', '/all/'],
		// nav: ['/', '/tag/', '/all/snippets/', '/all/', '/work/', '/ar/work/'],
		author: {
			name: 'Ahmed Nagi',
			twitter: '@nagiworks',
		},
		articlesPerPage: 10,
		minimumFeaturedArticles: 10,
		featuredArticles: ['/laravel-deploy-bitbucket/', '/hill-chart/'],
	},
	head: [
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
