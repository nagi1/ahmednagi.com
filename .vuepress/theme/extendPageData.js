module.exports = {
    extendPageData (page) {   
        ensurePageHasFrontmatter(page)
        classify(page)
        setTitle(page)
        setSearchableTitle(page)
        setIcon(page)
        setIsoDate(page)
        setLang(page)
        setDir(page)
    }
}




function ensurePageHasFrontmatter(page) {
    if (! page.frontmatter) {
        page.frontmatter = {}
    }
}

function classify(page) {
    page.isArticle = page.regularPath.startsWith('/articles/') && page.regularPath !== '/articles/' 
    page.isTag = page.regularPath.startsWith('/tag/')
    page.isSearchable = page.regularPath.indexOf('/page/') === -1
}

function setTitle(page) {
    page.title = page.title 
        || (page.path === '/tag/' && 'Tags')
        || page.frontmatter.title
}

function setSearchableTitle(page) {
    page.searchableTitle = page.frontmatter.searchableTitle || page.title
}

function setIcon(page) {
    page.icon = page.frontmatter.icon 
        || (page.isArticle && 'news')
        || (page.isTag && 'tag')
        || 'document'
}

function setIsoDate(page) {
    page.isoDate = page.frontmatter.date
}

function setLang(page) {
    page.lang = page.path.includes('/ar/') ? 'ar' : 'en';
}

function setDir(page) {
    page.dir = page.lang === 'ar' ? 'rtl' : 'ltr'; 
}
