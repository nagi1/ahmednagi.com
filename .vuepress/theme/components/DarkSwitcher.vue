<template>
	<label id="switch" class="switch">
		<input type="checkbox" :checked="dark" @change="toggle" id="slider" />
		<span class="slider round"></span>
	</label>
</template>

<script>
	import Bus from '@theme/Bus';

	export default {
		name: 'DarkSwitcher',

		data() {
			return {
				dark: false,
			};
		},

		methods: {
			toggle() {
				this.dark = !this.dark;
				Bus.$emit('dark', this.dark);
			},
		},

		created() {
			Bus.$on('dark', (mode) => {
				this.dark = mode;
			});
		},
	};
</script>

<style scoped>
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 55px;
		height: 30px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	/* .slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	} */

	.slider:before {
		position: absolute;
		content: '';
		height: 35px;
		width: 35px;
		left: 0px;
		bottom: 4px;
		top: 0;
		bottom: 0;
		margin: auto 0;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		box-shadow: 0 0px 15px #2020203d;
		background: white
			url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOfSURBVEiJlZVLaFxVGMd/333NJG2a+ujUJnGSSWljGvPoQ0tBbIooulDoQgSpEou4UOqiLlzpxoVFEIsgaotaaEhBEXVV8EUXgrao0SYxk6ROjCUxfaQvm8fMPfd+LqZJ5k4ySfxW93yP/+Ocw7mwTOhw21odbG8rzuf6N3fl+iqNDm5rXGreKlXwB1oe8vtr0yanF4JY1YeR2lDzbgnHn5JwxvYJjuhwR7wUjixUXBc3Wfsk/lg7sUYkvmXC1vB+qe3K5IZa90s2cxTNWQASa4B4C0AAfO8kOx8pxnMi4OdaEmbmcg9mIoF7NxLfAiIvSLIrAyChjswpsysg3jy7tEEuLeZgbotUsQL/SjdmIoF4SPl2QM7YNce/mO1xG85+p27dy3lp1XMbIPCrfbGsY0kCM7DxWzWXqgCINQIugh4TQSMuYRRAxSnM/Ss7jvglCfy+1gfwx/bMuhWv/lbR/rp4wLZw88qzPYIcBDIscpazkZdhXf2YMLy1DwnIq1Muxv5eMLCp5zPta6qQTb03oRdVDkO7XYpAdLhtrZkcuoKavIp4MxK7ByDrJDtLXr+VhmWy/oE5cECkfPYzpiNP37ZSIE23pLSvyVtAIGR3RTLizn0ay25ZEXjm3vVGL/wWxCrfU22PXH1LMVXR7lzhYu+y4H+1bjWTf45jV6/Bq38+OF/zTYTAEnUjAzozb0bp0H+eW7cUgdT93o274QxeDQChhK9GCELcy5GJILKsDHxzaFkX4qUJp99F5agrzrWIgFy68SPxM/vnMw6y5glg/uYJctBOHn9nOaLCyJ1/ZqeE4WrLldgHUTkGzY1EU+jb/si+t4oPsFSYkX3PWqqnLJGdAmD+SNzU4PqquQ6rDKl4LOIi70T7FN6wA/crSR2bKaypPmmbUfdBCezXEN0DqC1hgwAEg42Hwmwmcjji1UPZ9lIipxB+Ah1FLR90A3AfcGdBz5dOsnOv5Nmxgv7ENQ2uV0RgynYgXmolu1Ic03YQbJPUiXT+xyGEtnPXw1heGG37Bc2e+9/oAq9I6kQaCp5r2Xz2tHqpA4hb8DwrzHSjUz9COL0icEXftJOd7xeQRcMMNT1ObuxzDafcaMVGvFrw6sC6HWTB6DTwkpPs/KTIzSIqhrauM8GNTzHjuwsfwvkpB6w1IHEQVGV1r+vc8aJsPPXDgtaSXgEd2FXtc/V1gslHLabWa5jzEAXsACm/IVbZz8iqw05Dz8lSGP8BjRZeDZkbZsEAAAAASUVORK5CYII=);
		background-repeat: no-repeat;
		background-position: center;
	}

	/* input:checked + .slider {
		background-color: #2196f3;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	} */

	input:checked + .slider:before {
		/* -webkit-transform: translateX(24px);
		-ms-transform: translateX(24px);
		transform: translateX(24px); */
		background: white
			url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALUSURBVEiJrZVbSBRhGIafmZ1dR0dNzXU9m64u6ZLkdpAUIqguIoruMukyShCKiKCruuvCkoToxq6sEAKxI3QkqCTDLEErSzdTkcojxJbHdf8udkR3XHUkX/jg5/3+732/759/ZsAkIlT1qaZFD2ta9HCEqj42W2cWCTabzecpLhGe4hJhs9l8QIKZQsmUfLyjSdp/spjIGIVAAKm/WwTaH31ksKfwf7qeR5yjV65+L1A1QUSUwKoK1OgJM6WKaZPpceQL+tH3egk0nB9n8s/aGCTII9a8hwd9A/0TNoDk9Dj5pzJm+WG6u+WxbVcxw613EcfLgtFabxH7dsjTwNaViuUV8q6UJO5fv0hiCBs1S80ZizU3XXoBuFZjkMT8zXKnOXj1rI7k3KwwzptnaKyyxLgypQ+AW6clXWNJgzLgCpCa7uD5i1s43Hl605EQGx2MqMggt2m7n3uXFc2VJTUDKcAl4PByEwGQmsSbptsEhBcxF/6viJHWYMx2zfOiC/HymlUU5EgdZo4IoMCZRW7pltCX0NsHVbXB8PaFKuwsEWTYJRew0ShmMRKayrFzFRzwuEMNEuNhb2kw1scb2xRMjCmWpo7Az8lpXi81QTlQFBtLfnaGyU/IHBRBdopEqp2tgEfXWmQQHElmRl7p8oaBLIOi4AdECL9gXQ+0/fbxubuX2VWp+yW6BwSDo7QCbbrWIgMAfH95cOMOY6symLLQ+Gp2+tcojcZUuMPo8vbx7V27SXEBb1skBkaEF/Aa08aHeQrIAGo3pNHUcge7fYXfymCPld0n/BOfvotCoALoA64utd8xZ6qp7NmQxlBL44KXyhDNdYpwZ0vjCevYu6Bh+3ITGOFKtlPnzMR59BDx+U4UBHR+kQMNT8TUjyF6OnvFIcIcjRlIQI2+ztU0TudkcrMwj4akRM4CTj1XbaLRsEgEKg2cBygycJX63jVBOXBkNQX/AM3s8nU2BQM+AAAAAElFTkSuQmCC);
		background-repeat: no-repeat;
		background-position: center;
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
