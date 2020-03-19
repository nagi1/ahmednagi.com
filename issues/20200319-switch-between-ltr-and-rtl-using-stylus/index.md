---
title: Switch between LTR and RTL using stylus
image: /covers/rtl-ltr.png
layout: issue
permalink: issue/stylus-switch-direction
date: '2020-03-19 16:00'
tags:
  - issue
  - stylus
  - RTL
---
Supporting RTL can quickly become a tedious and complicated process.

### The issue

I wanted the style this code block to be dynamic when switching direction between left and right

**This styles for the markdown codeblock in Stylus**

```css

display block
left -33.33333333333%
right inherit
margin-left inherit
margin-right inherit

```

**Outputs in LTR view:**

![LTR view](/uploads/rtl-styuls.png)

**no problem until I switch to RTL view**

![](/uploads/ltr.stylus.png)



### Solution

```scss
// Inverse Mixin
inverse-style(prop, value, inverse-prop, inverse-value) {
	{prop}: value;

	html[dir=rtl] & {
		{inverse-prop}: value;
		{prop}: inverse-value;
	}
}

// usage
inverse-style(left, -33.33333333333%, left, 33.33333333333%)
```



### Explanation

Basically this function takes property and it's value and the reverse prop and it's value in this case we don't have an inverse property only inverse value.

When converting to RTL view `left:-33.33%` was pulling the block to the wrong direction, so we need to reverse the negative left pulling to be positive 



## Another variation



### Swap CSS property based on direction

What if you wanted to padding-left and in RTL view a padding-right?

```scss
// Inverse Mixin
inverse-style(prop, value, inverse-prop, inverse-value) {
  html[dir=ltr] & {
    {prop}: value;
  }

	html[dir=rtl] & {
		{inverse-prop}: inverse-value;
	}
}

// usage
inverse-style(padding-left, 2px, padding-right, 2px)
```

This variation of the same idea will swap the whole property based on the direction.