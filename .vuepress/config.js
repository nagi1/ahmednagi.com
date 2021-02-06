const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
	title: 'Ahmed Nagi',
	locales: {
		'/ar/': {
			lang: 'ar',
			title: 'احمد ناجي',
			description: 'مدونة مطور',
		},
		'/': {
			lang: 'en',
			title: 'Ahmed Nagi',
			description: 'Dev Blog',
		},
	},
	plugins: [
		[
			'@vuepress/pwa',
			{
				serviceWorker: true,
				updatePopup: true,
			},
		],
		[
			'@vuepress/google-analytics',
			{
				ga: 'UA-189097283-1', // UA-00000000-0
			},
		],
	],
	postcss: {
		plugins: [require('tailwindcss')('./tailwind.config.js'), require('autoprefixer')],
	},
	configureWebpack: (config, isServer) => {
		if (/* !isServer */ true) {
			return {
				module: {
					rules: [
						{
							test: /\.(jpe?g|png|gif|svg)$/i,
							loader: 'file-loader',
							options: {
								bypassOnDebug: true,
							},
						},
					],
				},
				plugins: [
					new ImageMinimizerPlugin({
						minimizerOptions: {
							// Lossless optimization with custom option
							plugins: [
								['gifsicle', { interlaced: true }],
								['jpegtran', { progressive: true }],
								['optipng', { optimizationLevel: 5 }],
								[
									'svgo',
									{
										plugins: [
											{
												removeViewBox: false,
											},
										],
									},
								],
							],
						},
					}),
				],
			};
		}
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
		featuredArticles: ['/learn-laravel-deployer-2/', '/ar/laravel-page/'],
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
