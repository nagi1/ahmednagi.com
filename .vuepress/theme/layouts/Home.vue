<template>
    <div class="bg-body">
        <div class="container-xl">
            <Header no-home />
            <ArticleGrid :articles="$featuredArticles" />
            <div class="flex flex-col sm:flex-row items-center justify-center mb-16">
                <a class="text-primary text-lg font-semibold" href="#" @click.prevent="$parent.$refs.navigator.open()">Search</a>
                <div class="px-2 py-2">
                    <Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
                </div>
                <router-link class="text-primary text-lg font-semibold" to="/tag/">Browse by tags</router-link>
                <div class="px-2 py-2">
                    <Icon icon="star" class="w-6" secondary="text-white" primary="text-brand" />
                </div>
                <router-link class="text-primary text-lg font-semibold" to="/articles/">List all articles</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import ArticleGrid from '@theme/components/ArticleGrid'

export default {
    components: { Header, ArticleGrid },
}
</script>
