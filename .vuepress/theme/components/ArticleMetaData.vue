<template>
    <div class="flex flex-col sm:flex-row sm:items-center text-secondary font-semibold bg-ternary rounded-lg border border-borderPrimary px-4 py-2 overflow-x-auto mb-8">

        <div class="flex flex-shrink-0 items-center mb-2 sm:mb-0 sm:mr-6">
            <Icon icon="calendar" class="w-5 h-5 flex-shrink-0" primary="text-secondary"></Icon>
            <div class="ml-2 flex-shrink-0" v-text="`${formattedDate} (${relativeDate})`"></div>
        </div>
        <div class="flex flex-shrink-0 items-center">
            <Icon icon="tag" class="w-6 h-6 flex-shrink-0" primary="text-gray-500" secondary="text-gray-700"></Icon>
            <router-link v-for="tag in $page.frontmatter.tags" :key="tag" :to="`/tag/${tag}`" class="ml-2 bg-brand px-2 text-base rounded-lg flex-shrink-0 border-0 text-gray-100 hover:text-gray-900 " v-text="`${tag}`"></router-link>
        </div>
    </div>
</template>

<script>
import { relativeDate, formatDate } from '@theme/utils'

export default {
    computed: {
        relativeDate () {
            return relativeDate(this.$page.isoDate)
        },
        formattedDate () {
            return formatDate(this.$page.isoDate)
        },
    }
}
</script>
