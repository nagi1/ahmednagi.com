<template>
	<div class="xl:px-4" :class="{ 'theme-dark': dark }">
		<!-- Animated background. -->

		<AnimatedGradient class="fixed inset-0" />

		<!-- Search and navigation menu. -->

		<Navigator ref="navigator" />

		<!-- Page. -->

		<!-- Top Navigation -->
		<!-- <div class="relative hidden w-full max-w-screen-xl mx-auto overflow-hidden shadow-lg h-14 md:flex bg-primary xl:my-8 xl:rounded-lg">
			<div class="absolute right-3">
				<Icon icon="curve-arrow" class="w-10" secondary="text-white" />
			</div>
		</div> -->

		<div class="relative w-full max-w-screen-xl mx-auto mt-4 overflow-hidden shadow-lg xl:my-8 xl:rounded-lg">
			<!-- Quick links -->
			<!-- <div class="flex items-center px-3 py-2 space-x-5 rtl:flex-row-reverse bg-ternary text-primary">

				<router-link class="text-lg font-semibold no-underline text-primary hover:text-linkHover hover:underline" to="/hire-me">Hire me</router-link>

				<router-link class="text-lg font-semibold no-underline text-primary hover:text-linkHover hover:underline" to="/resume">My Resume</router-link>

			</div> -->

			<MenuButton @click="$refs.navigator.open()" />

			<div class="flex flex-col">
				<div class="flex items-center py-3 bg-body">
					<div class="flex justify-center w-full">
						<dark-switcher class="rtl:ml-3" />

						<router-link class="text-lg font-semibold no-underline text-secondary hover:text-linkHover hover:underline" :to="langLink.href">{{ langLink.text }}</router-link>
					</div>
				</div>

				<component :is="layout" />
			</div>

			<div class="bg-transparent border-t border-borderPrimary">
				<Footer />
			</div>
		</div>
	</div>
</template>

<script>
	import AnimatedGradient from '@theme/components/AnimatedGradient';
	import Navigator from '@theme/components/Navigator';
	import MenuButton from '@theme/components/MenuButton';
	import DarkSwitcher from '@theme/components/DarkSwitcher';
	import Footer from '@theme/components/Footer';
	import Bus from '@theme/Bus';
	import SubscribeForm from '@theme/components/SubscribeForm';

	// Available layouts.
	import Article from '@theme/layouts/Article';
	import ArticlesAll from '@theme/layouts/ArticlesAll';
	import ArticlesPaginated from '@theme/layouts/ArticlesPaginated';
	import Home from '@theme/layouts/Home';
	import Layout from '@theme/layouts/Layout';
	import Tags from '@theme/layouts/Tags';

	export default {
		components: {
			AnimatedGradient,
			Navigator,
			MenuButton,
			DarkSwitcher,
			Footer,
			Article,
			ArticlesAll,
			ArticlesPaginated,
			Home,
			Layout,
			Tags,
			SubscribeForm,
		},

		data() {
			return { dark: false };
		},
		methods: {
			setDirection() {
				const html = document.getElementsByTagName('html')[0];

				if (this.$lang === 'ar') {
					html.setAttribute('dir', 'rtl');
				} else {
					html.setAttribute('dir', 'ltr');
				}
			},

			setLanguage() {
				this.$i18n.locale = this.$lang;
				if (this.$lang !== this.$page.lang) {
					console.log('not same');
				}
			},

			setDark(mode) {
				this.dark = mode;
				this.$cookies.set('dark', mode, '7d', null, null, null, 'Lax');
				// this.$cookies.set('dark', mode, '7d');
			},

			cleanSlug(url) {
				return url.replace('/', '').replace(/\/$/, '');
			},

			SlugWithoutLocale(url) {
				return this.cleanSlug(url.replace('/ar/', ''));
			},

			shared() {
				this.setLanguage();
				this.setDirection();
			},

			setDarkFromCookie() {
				// Fucked up cookie
				const darkCookie = this.$cookies.get('dark');

				if (darkCookie === null) {
					this.dark = false;
				} else {
					this.dark = darkCookie === 'false' ? false : true;
				}

				Bus.$emit('dark', this.dark);
			},
		},
		created() {
			// console.log(this.$site);
		},

		mounted() {
			this.shared();
			Bus.$on('dark', (mode) => this.setDark(mode));
			this.setDarkFromCookie();
		},

		updated() {
			this.shared();
			Bus.$emit('dark', this.dark);
		},
		computed: {
			layout() {
				if (!this.$page.path) return 'NotFound';
				if (this.$frontmatter.layout) return this.$frontmatter.layout;
				if (this.$page.isArticle) return 'Article';
				return 'Layout';
			},
			langLink() {
				const currentPageSlug = this.SlugWithoutLocale(this.$page.path);

				// get page in another language
				const pageLang = this.$site.pages.filter((page) => currentPageSlug === this.SlugWithoutLocale(page.path) && this.$page.key !== page.key);

				const link = {};

				if (pageLang.length < 1) {
					link.href = this.$lang === 'en' ? '/ar/' : '/';
					link.text = this.$lang === 'en' ? 'اقرأ بالعربي' : 'English';
				} else {
					link.href = pageLang[0].path;
					const langText = this.$lang === 'en' ? 'اقرأ بالعربي - ' : 'English - ';
					link.text = langText + pageLang[0].title.substring(0, 20).trimEnd() + '...';
				}

				return link;
			},
		},
	};
</script>
