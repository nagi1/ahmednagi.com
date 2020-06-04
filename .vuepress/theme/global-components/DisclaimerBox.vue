<template>
	<p class="flex flex-col text-justify md:flex-row bg-red-200 p-3 text-black rounded-lg shadow flex">
		<svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-red-600 h-6" viewBox="0 0 24 24">
			<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
		</svg>

		<span class="md:ml-2 mr-1 font-bold text-base">Disclamer:</span><span class="text-base">{{ body }}</span>
	</p>
</template>

<script>
	export default {
		props: ['body'],
	};
</script>
