<template>
	<div class="flex flex-col px-1 py-2 mb-8 overflow-x-auto font-semibold border rounded-lg sm:flex-row sm:items-center text-secondary bg-ternary border-borderPrimary sm:px-4">
		<div v-if="readingTime" class="flex items-center flex-shrink-0 mb-2 sm:mb-0">
			<Icon icon="clock-outline" class="flex-shrink-0 w-5 h-5 fill-current" primary="text-secondary"></Icon>
			<div class="flex-shrink-0 ltr:ml-2 rtl:mr-2" v-text="readingTime"></div>
		</div>
		<div class="flex items-center flex-shrink-0 mb-2 sm:mb-0 sm:ltr:ml-2 sm:rtl:mr-2">
			<Icon icon="calendar" class="flex-shrink-0 w-5 h-5 fill-current" primary="text-secondary"></Icon>
			<div class="flex-shrink-0 ltr:ml-2 rtl:mr-2" v-text="`${formattedDate} (${relativeDate})`"></div>
		</div>
		<div class="flex items-center flex-shrink-0 sm:ltr:ml-2 sm:rtl:mr-2">
			<Icon icon="tag" class="flex-shrink-0 w-6 h-6 fill-current" primary="text-primary"></Icon>
			<router-link
				v-for="tag in $page.frontmatter.tags"
				:key="tag"
				:to="`/tag/${tag}`"
				class="flex-shrink-0 px-2 text-base text-gray-100 border-0 rounded-lg ltr:ml-2 rtl:mr-2 bg-brand hover:text-gray-900"
				v-text="`${tag}`"
			></router-link>
		</div>
	</div>
</template>

<script>
	import { relativeDate, formatDate } from '@theme/utils';

	export default {
		computed: {
			readingTime() {
				if (!this.$page.readingTime) return false;

				const readingTime = this.$page.readingTime;
				const mins = Math.round(readingTime.minutes);

				if (mins <= 1) {
					return `${this.$t('metaData.quickRead')}`;
				}

				return `${mins} ${this.$t('metaData.readingTime')}`;
			},
			relativeDate() {
				return relativeDate(this.$page.isoDate);
			},
			formattedDate() {
				return formatDate(this.$page.isoDate);
			},
		},
	};
</script>
