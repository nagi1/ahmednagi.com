<template>
	<div class="bg-primary">
		<div class="container mt-16">
			<h1 class="text-4xl font-bold leading-tight text-primary md:text-5xl">
				{{ $t('notFound.areYouLost') }}
			</h1>
		</div>

		<div class="container mb-16">
			<p class="my-8 text-xl font-bold leading-tight text-primary">Don't be, here's some articles read:</p>
			<router-link
				:to="article.path"
				v-for="article in $articles"
				:key="article.key"
				class="block px-4 py-2 m-0 border-0 rounded-lg cursor-pointer hover:bg-blackrock hover:no-underline hover:text-white"
			>
				<div class="text-sm font-semibold tracking-wider text-gray-500 uppercase" v-text="relativeDate(article)"></div>
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
