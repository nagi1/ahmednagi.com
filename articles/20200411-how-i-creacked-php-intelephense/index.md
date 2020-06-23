---
title: "How I cracked php Intelephense"
image: /covers/php-intelephense.png
permalink: crack-intelephense
subtitle: ""
date: 2020-04-11 14:39
description: How to unlock premium features in php intelephense extension for vscode.
tags:
  - php
  - vscode
  - tools
---
<DisclaimerBox body="This tutorial is for educational purposes only." />

I love how **[Intelephense](https://intelephense.com/)** brings most of PHPStorm features to VSCode. But unfortunately the free version doesn't have the cool features.

> **Note:** *I'm applying this on the current release 1.4.1, file names might change in upcoming releases, though the same principle applies.*

So let's get started.

#### Open Extensions folder `Ctrl+p`

![](/uploads/open-ext-fold.png)

Then navigate to `"lib/extention.js"` file in `"bmewburn.vscode-intelephense-client-x"` folder where `x` is the current release. I recommend backup `extention.js` file before continue.

#### Open and reformat

Before we go any further go ahead and open the GitHub **[repo](https://github.com/bmewburn/vscode-intelephense/blob/master/src/extension.ts)** to help us navigate through the obscured `"lib/extention.js"` file.

* Open [extention.ts](https://github.com/bmewburn/vscode-intelephense/blob/master/src/extension.ts) from the repo.
* Open `extention.js` and use prettier to reformat the obscured code.
* Search for `Failed to activate key` In both files.

You'll have something like this.

```typescript
    return new Promise((resolve, reject) => {
        let responseBody: string = '';

        let req = https.request(options, res => {

            res.on('data', chunk => {
                responseBody += chunk.toString();
            });

            res.on('end', () => {
              // if entered a valid code register it in a file
                if (res.statusCode === 200) {
                    let filepath = path.join(context.globalStoragePath, 'intelephense_licence_key_' + licenceKey);
                    fs.writeFile(filepath, responseBody).then(resolve, reject);
                } else {
                    reject(new Error('Failed to activate key'));
                }
            });

            res.on('error', reject);
        });

        req.write(postData);
        req.on('error', reject);
        req.end();
    });
```

**Explanation:** This method checks entered key is valid ageist an endpoint, if the returned response is 200 register the key.
If the request rejected throw new error "Failed to active key".
So, basically we want to remove the ability to reject the request.

This what we want to achieve:

```typescript
    return new Promise((resolve, reject) => {
        let responseBody: string = '';

        let req = https.request(options, res => {

            res.on('data', chunk => {
              // 1. override responseBody
              responseBody = '{"success":{"code":200,"message":"Thank you"}}';
            });

            res.on('end', () => {
              // remove the check of status code
                //if (res.statusCode === 200) {
                    let filepath = path.join(context.globalStoragePath, 'intelephense_licence_key_' + licenceKey);
                    fs.writeFile(filepath, responseBody).then(resolve, reject);
   /*
                } else {
                    reject(new Error('Failed to activate key'));
                }
            });

   */

              // remove this on error check
            //res.on('error', reject);
        });

        req.write(postData);
        //req.on('error', reject);
        req.end();
    });
```

Now that we understood how this file works, we can apply this in our local **`extention.js`** file.

> **I commented out the code that needs to be removed.**

```javascript
l.window.showInputBox(n).then((t) =>
      r(this, void 0, void 0, function*() {
         if ((yield e.globalState.update(R, t), void 0 !== t)) {
            if (t)
               // try {
               yield(function(e, t) {
                     let n = a.stringify({
                           machineId: c.createHash('sha256').update(u.homedir(), 'utf8').digest('hex'),
                           licenceKey: t,
                        }),
                        r = {
                           hostname: 'intelephense.com',
                           port: 443,
                           path: '/activate',
                           method: 'POST',
                           headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Content-Length': n.length,
                           },
                        };
                     return new Promise((o, a) => {
                        let c = '',
                           u = s.request(r, (n) => {
                              n.on('data', (e) => {
                                    // c += e.toString();
                                    // send success response with a fake message
                                    c = '{"success":{"code":200,"message":"Thank you"}}';
                                 }),
                                 n.on('end', () => {
                                    // if (200 === n.statusCode) {
                                    let n = i.join(e.globalStoragePath, 'intelephense_licence_key_' + t);
                                    f.writeFile(n, c).then(o, a);
                                    // } else a(new Error('Failed to activate key'));
                                 }), // <--- remove this comma
                                 //n.on('error', a);
                           });
                        u.write(n), u.on('error', a), u.end();
                     });
                  })(e, t),
                  l.window.showInformationMessage('Your Intelephense licence key has been activated.');
            // } catch (e) {
            // 	console.log(e),
            // 		l.window.showErrorMessage(
            // 			'Key could not be activated at this time. Please contact support.',
            // 		);
            // }

            E && b && (yield E.stop(), b.dispose(), (E = x(_, T, !0)), (b = E.start()));
         }
      }),
```

Be careful when editing obscured javascript code, you can screw things easily.

> **Tip:**  use [javascript-minifire](https://javascript-minifier.com/) to minify `extention.js` file after editing it.

#### Next

Open**`intelephense.js`** in `node_modules\intelephense\lib`

> I recommend disable tokinezer in your editor, this is a large file and could slow down your computer.

Search for

* `isActive(){`
* `isRevoked(){`
* `isExpired(){`

Change these methods with

`isActive(){return true;}`

`isRevoked(){return false;}`

`isExpired(){return false;}`

Save and reload vscode, then open the command palette

type `enter key` enter any 15 character license key. i.e.`EducationalCode`

![](/uploads/2020-04-11-17_44_43-purchaseticketstest.php-birdboard-visual-studio-code.png)

#### Further explanation

`extention.js` is responsible for accepting the license key and processing it through a request.

While `intelephense.js` is the main library responsible for all sorts of validation, it all boils down to a single method to determine if the premium extension is active or not which is `isActive()`method, which returns true or false.

In the same time other methods like `isExpired()` and `isRevoked()` which can simply return false to indicate that the license is not expired and not revoked.