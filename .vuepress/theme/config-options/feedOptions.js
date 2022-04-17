module.exports = {
	canonical_base: 'https://ahmednagi.com',
	count: 20,
	posts_directories: ['/articles/', '/ar/', '/pages/', '/snippets/'],
	sort: (entries) => entries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
};
