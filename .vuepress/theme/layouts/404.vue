<template>
	<div class="bg-primary">
		<div class="container mb-16">
			<h1 class="text-primary text-4xl md:text-5xl font-bold leading-tight">
                404 Are you lost?
            </h1>
		</div>

        <p class="text-primary text-xl font-bold leading-tight my-8">Don't be here's some articles read</p>
		<div class="container mb-16">
			<router-link
				:to="article.path"
				v-for="article in $articles"
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
