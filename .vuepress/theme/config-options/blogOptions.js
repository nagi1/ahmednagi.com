module.exports = {
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
				lengthPerPage: 10,
				getPaginationPageTitle: (_, key) => `${key} Tag`,
			},
		},
	],
	globalPagination: {
		lengthPerPage: 10,
	},
};
