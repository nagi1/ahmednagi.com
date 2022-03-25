<template>

	<div class="fixed inset-0 z-40 px-4 overflow-auto" v-if="openned">

		<div class="fixed inset-0 bg-ternary opacity-90" @click="close"></div>

		<div class="relative w-full max-w-xl mx-auto mt-8 mb-16 sm:mt-12">

			<div class="hidden mb-2 font-sans text-xl font-bold sm:block">{{ $t('navigator.featuredTags') }}</div>

			<div class="hidden grid-cols-3 gap-4 mb-8 sm:grid">

				<a
					v-for="tag in featuredTags"
					:key="tag.name"
					class="px-4 py-2 m-0 border-0 rounded-lg shadow-lg hover:bg-blackrock hover:no-underline hover:text-white"
					:class="tag.classes"
					:href="tag.path"
					@click="visit($event, tag.path)"
				>

					<div class="text-sm font-semibold tracking-wider uppercase opacity-75" v-text="tag.count"></div>

					<div class="text-lg font-semibold" v-text="tag.name"></div>

				</a>

			</div>

			<div class="border border-gray-300 rounded-lg shadow-xl">

				<input
					ref="input"
					type="text"
					class="w-full px-4 text-5xl leading-normal text-black bg-white rounded-t-lg focus:outline-none"
					:placeholder="$t('navigator.searchPlaceholder')"
					v-model="query"
					@keydown.enter="go($event)"
					@keydown.esc="close"
					@keydown.up.prevent="move(-1)"
					@keydown.down.prevent="move(1)"
				/>

				<div class="p-4 bg-white border-t border-gray-300 rounded-b-lg" @mouseleave="unfocus">

					<a
						v-for="(page, index) in suggestions"
						:key="page.key + (page.header ? `_${page.header.slug}` : '')"
						class="flex px-4 py-2 text-lg font-semibold text-gray-600 border-0 rounded cursor-pointer hover:no-underline hover:text-gray-600"
						:class="index === focused ? 'bg-gray-200' : ''"
						:href="page.path"
						@click="go($event, index)"
						@mouseenter="focus(index)"
					>

						<Icon
							class="flex-shrink-0 w-5 h-5 mt-1 ltr:mr-3 rtl:ml-3"
							:icon="page.icon"
							:primary="index === focused ? 'text-gray-600' : 'text-gray-500'"
							:secondary="index === focused ? 'text-black' : 'text-gray-700'"
						></Icon>

						<div :class="index === focused ? 'text-black' : ''">

							<div v-text="page.searchableTitle"></div>

							<span v-if="page.header" class="text-sm">&rightarrow;&nbsp;{{ page.header.title }}</span>

						</div>

					</a>

					<div v-if="query && suggestions.length === 0" class="p-6 text-center text-gray-600" v-text="$t('navigator.noResults')"></div>

				</div>

			</div>

			<!-- Icons -->

			<div class="flex justify-center mt-5">

				<!-- Twitter -->

				<a href="https://twitter.com/nagiworks" class="mx-2 border-0 text-primary hover:text-blue-500">

					<svg class="w-8 h-8 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

						<path
							d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
						/>

					</svg>

				</a>

				<!-- Github -->

				<a href="https://github.com/nagi1/" class="mx-2 border-0 text-primary hover:text-black">

					<svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">

						<path
							d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
						/>

					</svg>

				</a>

				<!-- Facebook -->

				<a href="https://facebook.com/nagiwork" class="mx-2 border-0 text-primary hover:text-blue-700">

					<svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">

						<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />

					</svg>

				</a>

				<!-- LinkedIn -->

				<a href="https://www.linkedin.com/in/ahmednagi/" class="mx-2 border-0 text-primary hover:text-blue-700">

					<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-current" viewBox="0 0 448 512">

						<path
							d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
						/>

					</svg>

				</a>

			</div>

		</div>

	</div>

</template>

<script>
	import { fetchPagesInArray } from '@theme/utils';

	export default {
		data() {
			return {
				openned: false,
				focused: 0,
				query: '',
			};
		},
		computed: {
			suggestions() {
				this.focused = 0;
				return this.query.trim() ? this.$search(this.query, 6) : this.menu;
			},
			menu() {
				return fetchPagesInArray(this.$site.pages, this.$site.themeConfig.nav);
			},
			featuredTags() {
				const laravelTag = this.$tag.list.find((tag) => tag.name === 'laravel');
				const snippetTag = this.$tag.list.find((tag) => tag.name === 'snippet');
				// const openSourceTag = this.$tag.list.find((tag) => tag.name === 'openSource');
				return [
					{
						name: 'Laravel',
						count: laravelTag.pages.length,
						path: laravelTag.path,
						classes: 'bg-topaz text-white',
					},
					// {
					// 	name: 'Open Source',
					// 	count: openSourceTag.pages.length,
					// 	path: openSourceTag.path,
					// 	classes: 'bg-blue-500 text-white',
					// },
					// {
					// 	name: 'js',
					// 	count: openSourceTag.pages.length,
					// 	path: openSourceTag.path,
					// 	classes: 'bg-yellow-500 text-gray-900',
					// },
					{
						name: 'Snippets',
						count: snippetTag.pages.length,
						path: '/all/snippets',
						classes: 'bg-purple-600 text-white',
					},
					{
						name: this.$t('navigator.seeAllTags'),
						count: this.$tag.length,
						path: '/tag/',
						classes: 'bg-moonlight text-gray-700',
					},
				];
			},
		},
		methods: {
			open() {
				this.openned = true;
				document.querySelector('body').classList.add('overflow-hidden');
				this.$nextTick(() => {
					this.$refs.input.focus();
				});
			},
			close() {
				this.openned = false;
				document.querySelector('body').classList.remove('overflow-hidden');
				this.reset();
			},
			go(event, index) {
				index = typeof index === 'undefined' ? this.focused : index;
				if (typeof this.suggestions[index] === 'undefined') return;
				this.visit(event, this.suggestions[index].path);
			},
			visit(event, path) {
				// Allow cmd+click to open a new tab.
				if (event.metaKey) return;
				event.preventDefault();

				// Push and close.
				this.$router.push(path);
				this.close();
			},
			reset() {
				this.focused = 0;
				this.query = '';
			},
			move(velocity) {
				this.focused += velocity;
				if (this.focused < 0) this.focused = this.suggestions.length - 1;
				if (this.focused >= this.suggestions.length) this.focused = 0;
			},
			focus(index) {
				this.focused = index;
			},
			unfocus() {
				this.focused = -1;
			},
		},
		mounted() {
			const keyboardHandler = (e) => {
				if (e.key === '/' && !this.openned) {
					e.preventDefault();
					this.open();
				}
				if (e.key === 'Escape' || e.key === 'Esc') {
					this.close();
				}
			};
			document.addEventListener('keydown', keyboardHandler);
			this.$once('hook:beforeDestroy', () => {
				document.removeEventListener('keydown', keyboardHandler);
			});
		},
	};
</script>
