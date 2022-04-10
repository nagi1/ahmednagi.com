<template>
	<form action="https://app.convertkit.com/forms/2018740/subscriptions" method="post" data-sv-form="2018740" data-uid="37ce9dbcf6" data-format="inline" data-version="5" :data-options="options">
		<div class="rtl:text-right text-primary">
			<div class="text-3xl font-semibold">{{ $t('newsLetter.title') }}</div>
			<p class="mt-3 text-lg">{{ $t('newsLetter.description') }}</p>
		</div>
		<div style="position: absolute; left: -5000px" aria-hidden="true">
			<input type="text" name="b_1825e48b40ecf67719a0884fa_33688ddc10" tabindex="-1" value="" />
		</div>

		<div class="flex flex-col items-center justify-center space-y-3">
			<div class="w-full max-w-md rounded-lg md:flex">
				<input
					class="w-full p-3 placeholder-gray-600 bg-white border-2 border-white rounded-lg appearance-none md:ltr:rounded-l-lg md:ltr:rounded-r-none md:rtl:rounded-l-lg md:rtl:rounded-l-none"
					type="email"
					name="email_address"
					:placeholder="placeholder"
					required
				/>
				<button
					class="flex-shrink-0 w-full h-10 mt-4 font-semibold tracking-wide text-gray-100 uppercase bg-gray-700 border-2 border-gray-700 rounded-lg md:h-auto md:mt-0 md:w-40 border-primary md:ltr:rounded-r-lg md:rtl:rounded-r-lg hover:border-blue-600 md:ltr:border-l-0 md:rtl:border-r-0 md:ltr:rounded-l-none md:rtl:rounded-r-none"
					:class="submitHovered ? 'text-2xl' : 'text-base sm:text-lg'"
					type="submit"
					id="mc-embedded-subscribe"
					v-text="submitText"
					data-element="submit"
					@mouseenter="submitHovered = true"
					@mouseleave="submitHovered = false"
				></button>
			</div>
			<p class="text-lg">{{ $t('newsLetter.subDescription') }}</p>
		</div>
	</form>
</template>

<script>
	import { randomElement } from '@theme/utils';

	export default {
		props: {},
		data() {
			return {
				submitHovered: false,
				placeholder: this.$t('newsLetter.placeholder'),
				submitButton: this.$t('newsLetter.subscribe'),
				submitEmojis: ['💌', '🎁', '😘', '🙌', '👋', '👀', '🐼', '⛄️', '🎂', '🍺', '🚀', '💡', '💎', '🎉', '📦', '📚', '📨', '🍪'],
			};
		},
		computed: {
			submitText() {
				return this.submitHovered ? randomElement(this.submitEmojis) : this.submitButton;
			},
			options() {
				return {
					settings: {
						after_subscribe: { action: 'message', success_message: this.$t('newsLetter.successMessage'), redirect_url: this.$themeConfig.domain },
						analytics: { google: null, facebook: null, segment: null, pinterest: null, sparkloop: null, googletagmanager: null },
						modal: { trigger: 'timer', scroll_percentage: null, timer: 5, devices: 'all', show_once_every: 15 },
						powered_by: { show: true, url: 'https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form' },
						recaptcha: { enabled: false },
						return_visitor: { action: 'show', custom_content: '' },
						slide_in: { display_in: 'bottom_right', trigger: 'timer', scroll_percentage: null, timer: 5, devices: 'all', show_once_every: 15 },
						sticky_bar: { display_in: 'top', trigger: 'timer', scroll_percentage: null, timer: 5, devices: 'all', show_once_every: 15 },
					},
					version: '5',
				};
			},
		},
	};
</script>
