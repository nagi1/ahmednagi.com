---
title: Switch between LTR and RTL using stylus
image: /covers/rtl-ltr.png
layout: Snippet
permalink: snippets/stylus-switch-direction
date: 2020-03-19 16:00
tags:
  - snippet
  - css
  - RTL
  - stylus
---
Supporting RTL can quickly become a tedious and complicated process.

### The issue

I wanted a fix the codeblock direction  when switching direction between left and right

**This styles for the markdown codeblock in Stylus**

```sass
display block
left -33.33333333333%
right 33.33333333333%
margin-left inherit
margin-right inherit
```

**Outputs in LTR view:**

![LTR view](/uploads/rtl-styuls.png)

**no problem until I switch to RTL view**

![](/uploads/ltr.stylus.png)

**Instead of**

```scss
/* ltr */
.codeblock {
  left: 33.333%;
}


/* rtl */
html[dir=rtl] {
    .codeblock {
      left: -33.333%;
      right: 33.333%;
    }
}
```

## Solution

```scss
// Inverse Mixin
inverse-style(prop, value, inverse-prop, inverse-value) {
	{prop}: value;

	html[dir=rtl] & {
		{inverse-prop}: value;
		{prop}: inverse-value;
	}
}

/* usage */
.codeblock {
    inverse-style(left, -33.3333%, right, 33.3333%); /* setting LRT and RTL! */
}

```

### Explanation

Basically this function takes property and it's value and the reverse prop and it's value in this case we don't have an inverse property only inverse value.

When converting to RTL view `left:-33.33%` was pulling the block to the wrong direction, so we need to reverse the negative left pulling to be positive.

The mixin above is a simple but sends me into a state of euphoria. Instead of having to copy and maintain the nested structure, this mixin allows me to set the property values for LTR and RTL in the same place in code, avoiding the need to create separate RTL blocks. And this scenario, of simply swapping out properties depending on direction, covers 95% of direction scenarios.



## Another variation

### Swap CSS property based on direction

What if you wanted padding-left when the current direction is LTR and a padding-right in RTL?

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

This variation will swap the whole property based on the direction.
