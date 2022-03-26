import VueCookies from 'vue-cookies';
import VueI18n from 'vue-i18n';
import messages from './messages';
import ImgLazy from 'vuepress-plugin-img-lazy/ImgLazy';

export default ({ Vue, options }) => {
	Vue.use(VueCookies);
	Vue.use(VueI18n);
	Vue.component(ImgLazy.name, ImgLazy);

	options.i18n = new VueI18n({
		locale: 'en',
		messages: messages,
		fallbackLocale: 'en',
		silentTranslationWarn: true,
		silentFallbackWarn: true,
	});
};
