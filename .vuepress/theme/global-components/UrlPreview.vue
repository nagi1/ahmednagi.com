<template>
	<component v-if="dynamicComponent" :is="dynamicComponent" :url="url"></component>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				dynamicComponent: null,
			};
		},
		mounted() {
			import('@theme/components/UrlPreviewWrapped').then((module) => {
				this.dynamicComponent = module.default;
			});
		},
	};
</script>
