---
title: Better i18n support
image: /covers/untitled.png
permalink: ar/better-i18n-support
subtitle: specially Arabic
date: '2020-03-31 08:35'
description: >-
  little snippets to support different gender references in i18n languages
  specially Arabic.
tags:
  - i18n
  - javascript
  - snippets
---
Working with different languages can be challenging. Specially languages that have multiple references to different things like **gender.**

Languages like **Arabic** reference words as **male** or **female** depends on the context and grammar.\
In English when we refer to gender we say *(I'll till her / him)* in Arabic we say *(سوف اقول له)* for male, *(سوف اقول لها)* for female.

Managing this in a template using if statements can be tedious.

## This little snippet may help you

```javascript
/**
* Gender reference
* defaults to male refernce if gender is undefined
**/

function gr(gender, maleRef, femaleRef) {

        if(gender == 'female') {
          return femaleRef;
        }

        return maleRef;
}
```

```javascript
/**
* Usage
**/

// returns [I'll tell him.] if gender = male
const statement = `I'll tell ${gr(this.gender, 'him', 'her')}.`;


// or use it to interchage the whole statement
const statement = gr(this.gender, 'سوف اقول له', 'سوف اقول لها');
```

### Simple right.