---
title: Create Beautiful Link Previews Using Vuejs and Tailwindcss
image: /covers/create-link-previews.png
description: I'll Walk you through how to create dynamic link previews using vuejs and tailwind css
permalink: snippets/create-link-previews
layout: Snippet
date: 2022-03-25 16:00
tags:
  - snippet
  - tailwindcss
  - vuejs
  - social
---

![Link Preview](/covers/create-link-previews.png)

Today I'll walk you through how I created dynamic link previews like linked-in or twitter like the one bellow 👇

```vue
<UrlPreview url="https://twitter.com/nagiworks" />
```

<UrlPreview url="https://twitter.com/nagiworks" />

## Design the layout

Twitter link preview looks simple and appealing to me, so in this part I'll try to make something like it

![Twitter Link Preview](/uploads/twitter-link-preview.png)

### Sketch something quick on play.tailwindcss.com

When prototyping on a design idea I prefere to sketch something quick using [tailwindcss's official playground](https://play.tailwindcss.com/15bqq5U7Jo)

![Sketch Preview](/uploads/tailwindcss-play.png)

```html
			<div class="relative w-full mx-auto overflow-hidden bg-gray-200 rounded-md shadow sm:max-w-lg ring-1">
				<div class="flex flex-col space-y-2">
					<a href="#" class="w-full">
                        <img
                            class="object-cover w-full h-60"
                            src="https://opengraph.githubassets.com/97458523a208a357ce6682e4e0d609c409b7250d348cff3d774716d54fa4edfe/LeonardoCardoso/Facebook-Link-Preview"
                            alt="Preview" />
                    </a>

					<div class="flex flex-col p-3 space-y-1">
						<a href="#" class="m-0 text-lg leading-tight text-gray-900 no-underline hover:no-underline hover:text-gray-900 sm:text-xl">LeonardoCardoso/Facebook-Link-Preview</a>
						<p class="text-gray-500">github.com</p>
						<p class="text-sm">
                        Example Description here
                        </p>
					</div>
				</div>
			</div>
```

## Functionality

That's great design now we need to way to extract the metadata (title, description, image) from the url and for this I'm using a npm package called [vue-link-preview](https://www.npmjs.com/package/@ashwamegh/vue-link-preview).

Under the hood it uses express server heroku that will receive the link and parse the metadata out of it.
This package also validate the url for you and have some options you can view it's [documentation on github](https://github.com/ashwamegh/vue-link-preview)

## Create wrapping component

Generally I stick to create a wrapping component for most of the "packaged" componets.

``` vue
<template>
	<vue-link-preview dir="ltr" class="my-5" :url="url">
		<template v-slot:default="preview">
			<!-- Tailwindcss component goes here -->
		</template>
	</vue-link-preview>
</template>

<script>
	import VueLinkPreview from '@ashwamegh/vue-link-preview';

	export default {
		name: 'UrlPreview',
		components: {
			VueLinkPreview,
		},
		props: {
			url: {
				type: String,
				required: true,
			},
		},
		methods: {
            // helper function to limit excessive description
			limit(string, length) {
				return string.length > length ? string.substring(0, length) + '...' : string;
			},
		},
	};
</script>
```

## Full code snippet

```vue
<template>
	<vue-link-preview dir="ltr" class="my-5" :url="url">
		<template v-slot:default="preview">
			<div class="relative w-full mx-auto overflow-hidden rounded-md shadow bg-secondary sm:max-w-lg ring-1">
				<div class="flex flex-col space-y-2">
					<a :href="url" class="w-full"><img class="object-cover w-full h-60" :src="preview.img" :alt="preview.title" /></a>

					<div class="flex flex-col p-3 space-y-1">
						<a :href="url" class="m-0 text-lg leading-tight no-underline text-primary hover:no-underline hover:text-primary sm:text-xl">{{ limit(preview.title, 100) }}</a>
						<p class="text-gray-500">{{ preview.domain }}</p>
						<p v-text="limit(preview.description, 245)" class="text-sm"></p>
					</div>
				</div>
			</div>
		</template>
	</vue-link-preview>
</template>

<script>
	import VueLinkPreview from '@ashwamegh/vue-link-preview';

	export default {
		name: 'UrlPreview',
		components: {
			VueLinkPreview,
		},
		props: {
			url: {
				type: String,
				required: true,
			},
		},
		methods: {
			limit(string, length) {
				return string.length > length ? string.substring(0, length) + '...' : string;
			},
		},
	};
</script>

```
