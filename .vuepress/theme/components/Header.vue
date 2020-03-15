<template>
    <header class="my-10">
        <router-link v-if="! noHome" tag="button" :to="$lang === 'ar' ? '/ar/' : '/'" class="group flex items-center text-ternary mb-2 focus:outline-none">

            <Icon icon="arrow-thin-left-circle" class="w-6 h-6 mr-1" primary="text-white opacity-50 group-hover:opacity-100" secondary="group-hover:text-gray-900 text-ternary"></Icon>

            <div class="uppercase tracking-wider font-semibold text-sm group-hover:text-primary">Home</div>
        </router-link>

        <div class="text-primary text-4xl md:text-5xl font-bold leading-tight" v-text="effectiveTitle"></div>
        
        <div class="text-secondary font-serif text-xl md:text-2xl font-medium" v-if="effectiveSubtitle" v-text="effectiveSubtitle"></div>
    </header>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        noHome: Boolean,
    },
    computed: {
        effectiveTitle () {
            return this.title || this.$page.title
        },
        effectiveSubtitle () {
            return this.subtitle || this.$page.frontmatter.subtitle
        },
    }
}
</script>
