<template>
	<div class="bg-primary">
		<div class="container mb-16">
			<Header />
		</div>
		<Content />
		<div class="container mb-16">
			<router-link
				:to="article.path"
				v-for="article in $issues"
				:key="article.key"
				class="m-0 block hover:bg-blackrock hover:no-underline hover:text-white px-4 py-2 rounded-lg cursor-pointer border-0"
			>
				<div class="text-sm uppercase tracking-wider text-gray-500 font-semibold" v-text="relativeDate(article)"></div>
				<div class="text-xl" v-text="article.title"></div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { relativeDate } from '@theme/utils';
	import Header from '@theme/components/Header';

	export default {
		components: { Header },
		methods: {
			relativeDate(article) {
				return relativeDate(article.isoDate);
			},
		},

	};
</script>
