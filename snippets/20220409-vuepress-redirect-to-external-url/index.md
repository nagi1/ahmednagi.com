---
title: Vuepress redirect to external url
image: /covers/vuepress-redirect-external-url.png
description: Using awesome tool to get latest forks from github
permalink: snippets/vuepress-redirect-external-url
layout: Snippet
date: 2022-04-10 16:00
tags:
  - snippet
  - vuepress
---

If you want vuepress to redirect urls to any website here's how you do it 👇

![Link Preview](/covers/vuepress-redirect-external-url.png)

I wanted to create short urls that links to my social media and other external websites.

✅ In `enhanceApp.js` file add or insert the following snippet

```js
export default ({ Vue, options, router }) => {

	router.addRoutes([
		{
			path: '/facebook-group', // the url users will visit
			beforeEnter(to, from, next) {
                // you can add analysis or logging stuff here

                // url user will be redirected to 👇
				window.location.href = 'https://www.facebook.com/groups/laravel.arabic';
			},
		},
	]);

}
```

**⚠ Update `addRoutes` is deprecated in vue router 4 use `addRoute` instad 👇**

```js
export default ({ Vue, options, router }) => {

	router.addRoute(
		{
			path: '/facebook-group', // the url users will visit
			beforeEnter(to, from, next) {
                // you can add analysis or logging stuff here

                // url user will be redirected to 👇
				window.location.href = 'https://www.facebook.com/groups/laravel.arabic';
			},
		},
]);

}
```
