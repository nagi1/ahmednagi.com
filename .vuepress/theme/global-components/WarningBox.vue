<template>
	<p class="flex flex-col p-3 text-justify text-black bg-yellow-200 rounded-lg shadow md:flex-row">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 text-yellow-500 fill-current ltr:mr-3 rtl:ml-3" viewBox="0 0 24 24">
			<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
		</svg>

		<span class="text-base" v-html="body"></span>
	</p>
</template>

<script>
	export default {
		props: ['body'],
	};
</script>
