const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	theme: {
		textColor: theme => ({
			primary: 'var(--color-text-primary)',
			secondary: 'var(--color-text-secondary)',
			ternary: 'var(--color-text-ternary)',

			linkPrimary: 'var(--color-link-primary)',
			linkHover: 'var(--color-link-hover)',

			...theme('colors'),
		}),
		backgroundColor: theme => ({
			body: 'var(--color-bg-body)',

			primary: 'var(--color-bg-primary)',
			secondary: 'var(--color-bg-secondary)',
			ternary: 'var(--color-bg-ternary)',

			...theme('colors'),
		}),

		borderColor: theme => ({
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

				gray: {
					100: '#f7fafc',
					200: '#edf2f7',
					300: '#e2e8f0',
					400: '#cbd5e0',
					500: '#a0aec0',
					600: '#718096',
					700: '#4a5568',
					800: '#2d3748',
					900: '#1a202c',
				},
				red: {
					100: '#fff5f5',
					200: '#fed7d7',
					300: '#feb2b2',
					400: '#fc8181',
					500: '#f56565',
					600: '#e53e3e',
					700: '#c53030',
					800: '#9b2c2c',
					900: '#742a2a',
				},
				teal: {
					100: '#e6fffa',
					200: '#b2f5ea',
					300: '#81e6d9',
					400: '#4fd1c5',
					500: '#38b2ac',
					600: '#319795',
					700: '#2c7a7b',
					800: '#285e61',
					900: '#234e52',
				},
				blue: {
					100: '#ebf8ff',
					200: '#bee3f8',
					300: '#90cdf4',
					400: '#63b3ed',
					500: '#4299e1',
					600: '#3182ce',
					700: '#2b6cb0',
					800: '#2c5282',
					900: '#2a4365',
				},
				indigo: {
					100: '#ebf4ff',
					200: '#c3dafe',
					300: '#a3bffa',
					400: '#7f9cf5',
					500: '#667eea',
					600: '#5a67d8',
					700: '#4c51bf',
					800: '#434190',
					900: '#3c366b',
				},
			},
			fontFamily: {
				sans: ['"Cairo"', ...defaultTheme.fontFamily.sans],
				serif: ['"Cairo"', ...defaultTheme.fontFamily.serif],
				content: ['Cairo', ...defaultTheme.fontFamily.sans],
			},
			minHeight: {
				'72': '18rem',
			},
			opacity: {
				'90': '0.9',
			},
		},
		gradients: theme => ({
			topaz: ['30deg', '#EE7752', '#E73C7E'],
			river: ['30deg', '#23A6D5', '#23D5AB'],
			emerald: ['30deg', theme('colors.green.400'), theme('colors.teal.600')],
			blackrock: ['30deg', theme('colors.gray.700'), theme('colors.gray.900')],
			moonlight: ['30deg', theme('colors.gray.100'), theme('colors.gray.300')],
		}),
	},
	variants: {
		gradients: ['responsive', 'hover'],
		textColor: ['responsive', 'hover', 'focus', 'group-hover'],
		backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover'],
		flexDirection: ['responsive', 'direction'],
		margin: ['responsive', 'direction'],
		padding: ['responsive', 'direction'],
		borderRadius: ['responsive', 'direction'],
	},
	plugins: [require('tailwindcss-plugins/gradients'), require('tailwindcss-dir')()],
	corePlugins: {
		container: false,
	},
};
