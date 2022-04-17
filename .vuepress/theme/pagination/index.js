const path = require('path');

function getIntervallers(max, interval) {
	const count = Math.ceil(max / interval);
	const arr = [...Array(count)];
	return arr.map((v, index) => {
		const start = index * interval;
		const end = (index + 1) * interval - 1;
		return [start, end > max ? max : end];
	});
}

module.exports = (options, ctx) => ({
	enhanceAppFiles: [path.resolve(__dirname, 'clientPlugin.js')],

	ready() {
		const { pages } = ctx;

		const postsFilterClient = (pageContext, lang) => {
			return pageContext.isArticle && pageContext.lang == lang;
		};

		const postsFilter = (pageContext) => {
			return pageContext.isArticle;
		};

		const postsSorter = (prev, next) => {
			const prevTime = new Date(prev.frontmatter.date).getTime();
			const nextTime = new Date(next.frontmatter.date).getTime();
			return prevTime - nextTime > 0 ? -1 : 1;
		};

		const arPosts = pages.filter((pageContext) => {
			return pageContext.isArticle && pageContext.lang === 'ar';
		});

		const enPosts = pages.filter((pageContext) => {
			return pageContext.isArticle && pageContext.lang === 'en';
		});

		const perPagePosts = 10;
		const layout = 'ArticlesPaginated';

		const arIntervallers = getIntervallers(arPosts.length, perPagePosts);
		const enIntervallersEn = getIntervallers(enPosts.length, perPagePosts);

		const pagination = {
			enPaginationPages:
				enIntervallersEn.length !== 0
					? enIntervallersEn.map((interval, index) => {
							const path = index === 0 ? '/page/1' : `/page/${index + 1}/`;
							return { path, interval };
					  })
					: [],

			arPaginationPages:
				arIntervallers.length !== 0
					? arIntervallers.map((interval, index) => {
							const path = index === 0 ? '/ar/page/1' : `/ar/page/${index + 1}/`;
							return { path, interval };
					  })
					: [],

			postsFilter: postsFilter.toString(),
			postsFilterClient: postsFilterClient.toString(),
			postsSorter: postsSorter.toString(),
		};

		ctx.pagination = pagination;

		const generatePages = ({ path }, index) => {
			if (path === '/') {
				return;
			}
			ctx.addPage({
				permalink: path,
				frontmatter: {
					layout,
					title: `Page ${index + 1}`,
				},
			});
		};

		pagination.arPaginationPages.forEach(generatePages);
		pagination.enPaginationPages.forEach(generatePages);
	},

	async clientDynamicModules() {
		return {
			name: 'pagination.js',
			content: `export default ${JSON.stringify(ctx.pagination, null, 2)}`,
		};
	},
});
