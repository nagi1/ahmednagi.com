<template>
	<div class="bg-primary">
		<div class="container">
			<Header title="Tags" />
			<div class="grid grid-cols-2 gap-4 mb-16 sm:grid-cols-3">
				<router-link
					v-for="(tag, index) in tags"
					:key="tag.name"
					:to="tag.path"
					class="px-4 py-2 m-0 border-0 rounded-lg hover:bg-blackrock hover:text-white"
					:class="[classesFor(tag), gridClassesFor(index)]"
				>
					<div class="text-sm font-semibold tracking-wider uppercase opacity-75" v-text="tag.pages.length"></div>
					<div class="text-lg font-semibold" v-text="tag.name"></div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@theme/components/Header';

	export default {
		components: { Header },
		computed: {
			tags() {
				return this.$frontmatterKey.list.sort((a, b) => b.pages.length - a.pages.length);
			},
		},
		methods: {
			classesFor(tag) {
				if (tag.name === 'Laravel') return 'bg-topaz text-white';
				if (tag.name === 'Tailwind') return 'bg-river text-white';
				if (tag.name === 'Vue' || tag.name === 'Vuepress') return 'bg-emerald text-white';
				if (tag.name === 'snippet' || tag.name === 'snippets') return 'bg-purple-600 text-white';
				return 'bg-moonlight text-gray-700';
			},
			gridClassesFor(index) {
				if (index === 0) return 'col-span-2';
			},
		},
	};
</script>
