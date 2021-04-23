<template>
	<div class="flex items-center my-16 text-xl" v-if="$pagination">
		<router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink" class="flex items-center">
			<Icon key="newer" icon="arrow-thin-left-circle" class="w-6 h-6 mr-1" primary="text-white" secondary="group-hover:text-gray-900"></Icon>
			<div class="hidden sm:block">{{ $t('pagination.newerArticles') }}</div>
			<div class="sm:hidden">{{ $t('pagination.newer') }}</div>
		</router-link>
		<router-link v-if="$pagination.hasNext" :to="$pagination.nextLink" class="flex items-center ml-auto">
			<div class="hidden sm:block">{{ $t('pagination.olderArticles') }}</div>
			<div class="sm:hidden">{{ $t('pagination.older') }}</div>
			<Icon key="older" icon="arrow-thin-right-circle" class="w-6 h-6 ml-1" primary="text-white" secondary="group-hover:text-gray-900"></Icon>
		</router-link>
	</div>
</template>

<script>
	export default {
		//
	};
</script>
