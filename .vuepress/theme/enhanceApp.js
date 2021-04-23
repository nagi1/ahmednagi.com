import VueCookies from 'vue-cookies';
import VueI18n from 'vue-i18n';
import messages from './messages';

export default ({ Vue, options }) => {
	Vue.use(VueCookies);
	Vue.use(VueI18n);

	options.i18n = new VueI18n({
		locale: 'en',
		messages: messages,
		fallbackLocale: 'en',
		silentTranslationWarn: true,
		silentFallbackWarn: true,
	});
};
