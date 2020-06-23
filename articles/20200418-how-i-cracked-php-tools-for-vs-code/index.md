---
title: "How I cracked PHP Tools for VS Code"
image: /covers/php-tools.png
permalink: crack-php-tools
subtitle: ""
date: 2020-04-18 22:20
description: How to crack PHP Tools for VS Code
tags:
  - php
  - tools
  - vscode
---
<DisclaimerBox body="This tutorial is for educational purposes only." />

Last week I tried to unlock [Intelephense here](https://ahmednagi.com/unlock-intelephense/), and I got positive results so why not try the same approach with [PHP Tools](https://marketplace.visualstudio.com/items?itemName=DEVSENSE.phptools-vscode)?

> **Note:** *that I'm applying this on the current release 1.0.4, method names might change in upcoming releases, though the same principles applies.*

So let's get started.

#### Open Extensions folder `Ctrl+p`

![](/uploads/open-ext-fold.png)

Then navigate to `"out/src/extention.js"` file in `"devsense.phptools-vscode"` folder.

 I recommend backup `extention.js` file before we continue.

#### Open and reformat

This one is a little bit different from [the last one](https://ahmednagi.com/unlock-intelephense/), there's no unminified TypeScript to guide us this time.

* Disable any other php extension and enable PHP Tools only.
* Open `extention.js` and use prettier to reformat the obscured code.
* Search for "`The license has been stored`" you'll find this message inside the

`function ne()` is responsible for entering and receiving the code

```javascript
// check if the user entered a valid key
function Ne() {
	return e(this, void 0, void 0, function* () {
		let e = yield r.window.showInputBox({ prompt: J('promptText'), placeHolder: J('placeHolder'), ignoreFocusOut: !0 });
		if (e) {
          // n is the key
			let n = void 0;
          //... the rest of the function

	});
}
```

**Delete ``Ne()`` completely and Replace it with**

```javascript
// check if the user entered a valid key
function Ne() {
	return e(this, void 0, void 0, function* () {
		let e = yield r.window.showInputBox({ prompt: J('promptText'), placeHolder: J('placeHolder'), ignoreFocusOut: !0 });

      if (e) {
          // n is a custom key returned in a json response
			let n = '{ "signature":"9A67311816caZfsGXE6TxeS4NyN2UkaQC"}';
        // ie function is responsible for storing the license
			yield Ie(n);
		}

	});
}
```


> *Be careful when deleting or editing obscured javascript code it can broke easily*


**Next:** `Ie(n)` function, we only interested to change one line

```javascript
function Ie(n) {
	return e(this, void 0, void 0, function* () {
		try {
			JSON.parse(n),
              // we intreseted to change this line only
				exports.o.globalState.update(H.p(ke) + '.' + g.userInfo().username, n),
              //... other code
		}
	});
}
```

I think this function is responsible for saving the key in the global state of the vscode's context

so we'll change only this one line

```javascript
function Ie(n) {
	return e(this, void 0, void 0, function* () {
		try {
			JSON.parse(n),
              // change commented line
				//exports.o.globalState.update(H.p(ke) + '.' + g.userInfo().username, n),
              // to just your name and the key
              exports.o.globalState.update('Ahmed', n),

              //...other code
		}
	});
}
```



`function Ke()` Which I think is responsible for checking if the license is valid or expired

```javascript
// check if the key is valid
function Ke() {
	return e(this, void 0, void 0, function* () {
		let e = yield Fe();
		if (e) {
			var n = require(H.p(H.h))(g.userInfo().username) + '#' + e.license + '#' + e.expiration;
			return new (require(H.p(He)))(H.p(Y)).verify(n, e.signature, 'utf8', 'base64')
				? (yield Je(e))
					? K.Expired // return expired flag
					: K.Valid // return valid flag
				: K.Invalid; // return invalid flag
		}
		return K.Missing; // return missing flag
	});
}
```

 We are interested in returning the Valid flag only from this function, so no matter what the key we enter it will be considered a valid key.

```javascript
// simple enough we're returning only the valid flag
function Ke() {
	return e(this, void 0, void 0, function* () {
		return K.Valid;
	});
}
```

* Save and reload vscode
* `ctrl+p`
* type `activate `in the command palette and choose PHP Tools
* Enter this fake key "`9A67311816caZfsGXE6TxeS4NyN2UkaQC`"



And you'll should be fine.