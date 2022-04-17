module.exports = {
	image: ($page, $site) => ($page.frontmatter.image ? $site.themeConfig.domain + $page.frontmatter.image : $site.themeConfig.domain + '/uploads/ahmednagi.png'),
};
