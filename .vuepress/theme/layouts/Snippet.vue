<template>
    <div class="flex flex-col">
        <!-- Progress bar and share buttons. -->
        <FloatingHeader />

        <!-- Article. -->
        <article class="bg-body">
            <div class="container">
                <Header />
                <articleMetaData />
            </div>
            <Content />
        </article>


        <!-- Disqus. -->
        <div class="bg-primary py-16">
            <div class="container py-4 sm:py-8">
                <h2>{{ $lang === 'ar' ? 'التعليقات' : 'Comments' }}</h2>
                <Disqus 
                    shortname="ahmednagi" 
                    :title="$page.title"
                    :identifier="disqusIdentifier" 
                    :url="disqusUrl"
                />
            </div>
        </div>

    </div>
</template>

<script>
import Header from '@theme/components/Header'
import FloatingHeader from '@theme/components/FloatingHeader'
import ArticleMetaData from '@theme/components/ArticleMetaData'


export default {
    components: { Header, FloatingHeader, ArticleMetaData },
    computed: {
        disqusIdentifier () {
            return this.$page.frontmatter.disqus || this.$page.path
        },
        disqusUrl () {
            return this.$themeConfig.domain + this.$page.path
        },
    }
}
</script>
