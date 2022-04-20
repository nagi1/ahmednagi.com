<template>
	<vue-link-preview dir="ltr" class="my-5" :url="url">
		<template v-slot:default="preview">
			<div class="relative w-full mx-auto overflow-hidden rounded-md shadow-lg hover:ring-2 hover:shadow-xl bg-primary sm:max-w-lg ring-1">
				<div class="flex flex-col space-y-2">
					<a :href="url" target="__blank" class="w-full"><img @error="replaceByDefault" class="object-cover w-full h-60" :src="preview.image" :alt="preview.title" /></a>

					<div class="flex flex-col p-3 space-y-1">
						<a :href="url" class="m-0 text-lg leading-tight no-underline text-primary hover:no-underline hover:text-primary sm:text-xl">{{ limit(preview.title, 100) }}</a>
						<p class="text-gray-500">{{ preview.domain }}</p>
						<p v-text="limit(preview.description, 245)" class="text-sm"></p>
					</div>
				</div>
			</div>
		</template>
	</vue-link-preview>
</template>

<script>
	import VueLinkPreview from '@theme/components/VueLinkPreview';

	export default {
		name: 'UrlPreviewWrapped',
		components: {
			VueLinkPreview,
		},
		props: {
			url: {
				type: String,
				required: true,
			},
		},
		methods: {
			replaceByDefault(e) {
				e.target.src = 'https://ahmednagi.com/uploads/replace-not-found-link-previews.png';
			},
			limit(string, length) {
				if (string) return string.length > length ? string.substring(0, length) + '...' : string;

				return '';
			},
		},
	};
</script>
