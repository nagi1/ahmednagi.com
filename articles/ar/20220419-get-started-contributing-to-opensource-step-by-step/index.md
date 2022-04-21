---
title: "بالصور والمثال: كيفية المساهمة في كود مفتوح المصدر بالخطوات"
image: /covers/getting-started-with-opensource-ar.png
description: دليلك الفعلي بالخطوات عن كيفية البدء في المساهمة في البرامج مفتوحة المصدر
permalink: ar/getting-started-with-opensource
subtitle: "دليلك التفصيلي خطوة بخطوة"
date: 2022-04-20 16:00
tags:
  - opensource
  - guide
---

خطوة بخطوة وبالصور ستتعرف على كيفية البدء بالمساهمة في كود مفتوح المصدر على github من خلال العمل على باكج حقيقية.

## Roadmap

[[toc]]

## كيفية إيجاد مشروع مفتوح المصدر للمساهمة فيه

لا تستخف بأي مساهمة يمكنك حتى البدء بإصلاح الأخطاء الإملائية في ملف `readme`.

### في حالة أنك مبتدأ

على الرغم من أنني أشجع على بدء المساهمة في المجتمعات مفتوحة المصدر في أسرع وقت, إلا أنني أنصح بالبدء بالمساهمة في أي باكج أو كود بلغتك المفضلة في البداية.

يجب عليك البحث في repo ومعرفة كيفية كتابة الكود وماهي القوانين قبل البدء في المساهمة.

يوجد موقع اسمه **أول مشكلة جيدة** أو **Good First Issue** موقع جميل يمكنك البحث من خلاله على الباكدجات أو الاكواد التي تحتاج إلى حلول سهلة وتشكل فرصة جيدة للمبتدئين للعمل على البرامج مفتوحة المصدر.

👈 اذهب الى موقع  [good first issue](https://goodfirstissue.dev/) ثم اختر لغتك المفضلة أو إطار العمل الذي تفضل بدء العمل عليه.

![Good first issue](/uploads/getting-started-with-opensource/goodfirstissue.png)

👈 اختر المشروع أو اللغة التي تفضلها

👈 اذهب الى تاب الــ `Issues` على موقع github.

👈 في مربع البحث ادخل هذه 👇 الجملة ليظهرلك المشاكل السهلة فقط

```txt
is:issue is:open #good label:"good first issue"
```

![Github issue](/uploads/getting-started-with-opensource/githubissue.png)

### في حالة الخبرة المسبقة

بعد العمل على باكدج أو إطار عمل في بعض الاحيان تحتاج إلى إضافة بعض الميزات المفقودة والتي يمكن أن تحتاج إليها. في هذه الحالة سوف تكتب كود هذه الميزات بنفسك.

<Tip body="<b>نصيحة:</b> اكتب في قائمة المشاريع التي تود العمل عليها في المستقبل👇" />

![My contributions todo list](/uploads/getting-started-with-opensource/todo.png)



<span class="text-xl">👨‍💻 في هذا الدلبل سوف أشرح على باكج **PHP Laravel** تسمى `laravel-carbon-macros` وهي باكج توفر functions للتعامل مع الأجازات في كل أنحاء العالم, ولكن ينقصها دولة مصر.</span>

قبل أن نبدأ بالكود يجب أن أُجيبك على سؤال مهم 👇

## لماذا أكتب كود بشكل مجاني للآخرين؟

  **الإجابة باختصار:** أنت لا تكتب مجانًا بطريقة غير مباشرة! أنت ترد الجميل للمجتمع فبعد كل شيء معظم الباكجات أو أطر العمل مجانية للاستخدام.


  **بالاضافة إلى** أن مساهماتك في البرامج مفتوحة المصدر عبارة عن **CV on steroids** أقوى شيء يمكن أن يظهر مهاراتك في العمل. سوف تزيد فرصة قبولك في أي عمل بنسبة 80% إذا كان لديك تاريخ مساهمة في البرامج مفتوحة المصدر.

## ابدأ

بعد اختيار الباكدج أو الريبو التي تود العمل عليها, قم بعمل `fork` 👇لها

![fork](/uploads/getting-started-with-opensource/fork.png)

> **Forking** هو مثل النسخ واللصق كأنك تقوم بنسخ الكود من مكان الى اخر في github

### 1- انسخ رابط الريبو

![1](/uploads/getting-started-with-opensource/1.png)

### 2- افتح ال Terminal أو vs code

- اكتب هذا الأمر لنسخ الريبو

```bash
git clone https://github.com/nagi1/laravel-carbon-macros.git
```

- استبدل `nagi1` باسم مستخدم github الخاص بك و `laravel-carbon-macros` باسم الباكدج

- سوف يظهر لك ملفات الريبو على جهازك 👇

![2](/uploads/getting-started-with-opensource/2.png)

### 3- تعرف على دليل المساهمة

**اضمن قبول مساهمتك (PR) باتباعك للقواعد**. معظم المشاريع مفتوحة المصدر لديها دليل مساهمة أو ما يسمى `CONTRIBUTING.md` احرص على قراءة هذا الدليل قبل البدء بأي مساهمة.

![contributing.md](/uploads/getting-started-with-opensource/contributing-file.png)

<Tip body="<b>نصيحة:</b> افتح الPRs المساهمات من المطورين الآخرين وخذ فكرة عن المشاكل التي تواجهم وطريقة كتابة الكود."/>

## ابدأ بتحميل depandancies

لأن هذا مشروع php laravel فهو يستخدم `compoesr`, في البداية يجب تحميل كل الـdependacices للمشروع لبدء العمل عليه

```bash
composer install
```

<Tip body="<b>ملاحظة</b> اذا كان هذا مشروع جافاسكربت سوف تستخدم npm او yarn." />

## معرفة كيفية العمل مع الكود

<DangerBox body="<b>ملاحظة مهمة:</b> الكود التالي هو باستخدام php laravel ولكن لا تقلق اذا كنت لا تجيده لا مشكلة هو فقط لمجرد التمثيل ولكن الفكرة واحدة في أي لغة." />

**المطلوب:** إضافة الأجازات المصرية لمصر

اذهب الى مجلد `src` في الغالب يوجد الكود بداخله

![src](/uploads/getting-started-with-opensource/src-folder.png)

### اتبع العادات و التقاليد في الكود

![Follow convention](/uploads/getting-started-with-opensource/dates.png)


في الكود أعلاه ☝ سوف ترى كيف أن المطورين الآخرين يتبعون طريقة بسيطة في تسمية المجلدات، عبارة عن اسم الدولة ثم كلمة أجازة بالانجليزي holidays وهذا ما سنفعله تحديدًا.

## الكود

افتح أي مجلد عشوائي وليكن `CanadianDates.php` وانسخ الكود

![3](/uploads/getting-started-with-opensource/3.png)

### أنشئ ملف جديد بطريقة التسمية المتبعة

نسخت `CanadianDates.php` الى `EgyptianHolidays.php`

![4](/uploads/getting-started-with-opensource/4.png)

### أضف مساهمتك


بدأت بإضافة **أجازات مصر** كما أضفت أيضًا بعض التعليقات للمطورين الآخرين.

```php

    // https://en.wikipedia.org/wiki/Public_holidays_in_Egypt#National_holidays

    // This Trait will only contain fixed holidays as movable
    // holidays like Islamic New Year is occurs relative to
    // Islamic calendar, or may move to the end of the week

        Carbon::macro('isEgyptianChristmasDay', function () {
            /**  @var Carbon $this */

            return $this->month === 1 && $this->day === 7;
        });

```

## Test, Test and Test

من أهم أسباب عدم قبول مساهماتك على github هي أن المطورين لا يضيفون tests إلى الكود الذي يكتبونه أو يتوقعون أن المسؤول سوف يكتب الاختبار.

إضافة  بعض الtests للكود 👇

![8](/uploads/getting-started-with-opensource/8.png)

## اعمل commit للشغل المنتهي

بعد الانتهاء من العمل على ميزة اعمل commet لحفظ نقطة العمل ولا تنسى ان تكتب رسالة جميلة 👇

![commit](/uploads/getting-started-with-opensource/commit.png)

## اكتب docs للكود

سوف يكون من الرائع أن توثق الميزة التي عملت عليها لكي يعرف الشخص المسؤول عن الريبو أو المطورين الآخرين كيف يستخدمون الميزة بشكل فعال.

معظم الريبو مفتوحة المصدر تفضل وضع التوثيق في ملف `readme.md` أو في مجلد مخصص `docs`.

![docs](/uploads/getting-started-with-opensource/docs-folder-struc.png)

فتحت مجلد `docs` ووجدت أن كل دولة لها ملفها الخاص, فنسخت ملف أي دولة وسميته `egypt.md`.

### ضع لمستك

فتحت احد ملفات الدول الاخرى وجدت ان التنسيق سيء نوعًا ما

![docs](/uploads/getting-started-with-opensource/other-docs-example.png)

ليست أفضل دوكس في العالم 😂

ضفت لمستي على الدوكس فأصبح شكلها أجمل عن ذي قبل 👇

![docs after](/uploads/getting-started-with-opensource/11-docs.png)

## اعمل test

شغل الـــ test للتأكد من أن كل شيء يعمل بشكل جيد.

![Final test](/uploads/getting-started-with-opensource/Final-test.png)

## Commet and submit a PR

بعد الانتهاء من تنفيذ الميزة الخاصة بك وكتابة المستندات ، اعمل commit لشغلك.

حان الوقت لعمل  `PR`:

- اذهب للريبو المنسوخة وليس الريبو الاصلية ثم اضغط على زر `Open pull request` 👇

![Contribute](/uploads/getting-started-with-opensource/contribute.png)

![Contribute-2](/uploads/getting-started-with-opensource/contri-2.png)

### اكتب عنوان واضح لعملك

![Contribute-3](/uploads/getting-started-with-opensource/contrib-3.png)

## انتظر الــ PR إلى أن تقبل أو ترفض

بعد تقديم طلبك PR سوف تنتظر بعض الوقت لحين قبول الشخص المسؤول عن الريبو لطلبك بناءًا على تواجدهم وقواعدهم لقبول الطلبات.

![Contribute-4](/uploads/getting-started-with-opensource/contrib-4.png)


<Tip body="من فضلك كن لطيف, وانتظر المسؤول عن الريبو أن يقبل الــ PR وإياك أن تسبام الissues كل شخص له حياة وجدوله المشغول." />

![Late PR](/uploads/getting-started-with-opensource/late-pr.png)

## الخاتمة

هذه نهاية هذا المقال ولكنها بداية مشوراك في البرامج مفتوحة المصدر, أتمنى أن تشجعك هذه المقالة على خطواتك الأولى تجاه مشاركة العالم كودك الرائع!

إذا استمتعت بقرائة المقالة اتركلي تعليق في قسم التعليقات 👇 أو أرسل لي رسالة على تويتر. [@nagiworks](https://twitter.com/nagiworks)
