const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		'./.vuepress/theme/**/*.html',
		'./.vuepress/**/*.vue',
		'./.vuepress/theme/**/*.jsx',
		'./.vuepress/theme/**/*.styl',
		'./.vuepress/theme/**/*.md',
		'./.vuepress/theme/**/*.js',
		// './.vuepress/theme/**/*.css',
	],

	theme: {
		textColor: (theme) => ({
			primary: 'var(--color-text-primary)',
			secondary: 'var(--color-text-secondary)',
			ternary: 'var(--color-text-ternary)',

			linkPrimary: 'var(--color-link-primary)',
			linkHover: 'var(--color-link-hover)',

			...theme('colors'),
		}),
		backgroundColor: (theme) => ({
			body: 'var(--color-bg-body)',

			primary: 'var(--color-bg-primary)',
			secondary: 'var(--color-bg-secondary)',
			ternary: 'var(--color-bg-ternary)',

			...theme('colors'),
		}),

		borderColor: (theme) => ({
			...theme('backgroundColor'),
			...theme('colors'),
			borderPrimary: 'var(--color-border-primary)',
			borderSecondary: 'var(--color-border-secondary)',
		}),

		extend: {
			colors: {
				'white-50p': '#FFFFFF88',
				transparent: 'transparent',

				black: '#000',
				white: '#fff',
				brand: '#1da1f2',
				green: colors.emerald,
				yellow: colors.amber,
				purple: colors.violet,
			},
			fontFamily: {
				sans: ['"Tajawal"', ...defaultTheme.fontFamily.sans],
				serif: ['"Tajawal"', ...defaultTheme.fontFamily.serif],
				content: ['Tajawal', ...defaultTheme.fontFamily.sans],
			},
			minHeight: {
				72: '18rem',
			},
			opacity: {
				90: '0.9',
			},
		},
		gradients: (theme) => ({
			topaz: ['30deg', '#EE7752', '#E73C7E'],
			river: ['30deg', '#23A6D5', '#23D5AB'],
			emerald: ['30deg', theme('colors.green.400'), theme('colors.teal.600')],
			blackrock: ['30deg', theme('colors.gray.700'), theme('colors.gray.900')],
			moonlight: ['30deg', theme('colors.gray.100'), theme('colors.gray.300')],
		}),
	},

	plugins: [require('tailwindcss-plugins/gradients'), require('tailwindcss-dir')()],
	corePlugins: {
		container: false,
	},
};
