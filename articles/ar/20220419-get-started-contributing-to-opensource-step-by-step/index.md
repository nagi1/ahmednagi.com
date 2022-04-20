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

خطوة بخطوة وبالصور هتتعرف على البدء بالمساهمة في كود مفتوح المصدر على github من خلال العمل على باكج حقيقية.

## Roadmap

[[toc]]

## كيفية ايجاد مشروع مفتوح المصدر للمساهمة فيه

لا تستخف باي مساهمة يمكنك حتى البدأ باصلاح الاخطاء الاملائية في ملف `readme`.

### في حالة انك مبتدأ

بالرغم من انني اشجع على بدأ المساهمة في المجتمعات مفتوحة المصدر في اسرع وقت, إلا انني انصح بالبدأ بالمساهمة في اي باكج او كود بلغتك المفضة في البداية.

يجب عليك البحث في repo ومعرفة كيفية كتابة الكود وماهي القوانين قبل البدأ في المساهمة.

يوجد موقع اسمو **اول مشكلة جيدة** او **Good First Issue** موقع جميل يمكنك البحث من خلاله على الباكدجات او الاكواد اللتي تحتاج الى حلول سهلة وتشكل فرصة جيدة للمبتدأين للعمل على البرامج مفتوحة المصدر.

👈 اذهب الى موقع  [good first issue](https://goodfirstissue.dev/) ثم اختار لغتك المفضلة او اطار العمل الذي تفضل بدأ العمل عليه.

![Good first issue](/uploads/getting-started-with-opensource/goodfirstissue.png)

👈 اختر المشروع او اللغة التي تفضلها

👈 اذهب الى تاب ال `Issues` على موقع github.

👈 في مربع البحث ادخل هذه 👇 الجملة ليظهرلك المشاكل السهلة فقط

```txt
is:issue is:open #good label:"good first issue"
```

![Github issue](/uploads/getting-started-with-opensource/githubissue.png)

### في حالة الخبرة المسبقة

بعد العمل على باكدج او اطار عمل في بعض الاحيان تحتاج الى اضافة بعض الميزات المفقودة والتي ممكن ان تحتاح اليها. في هذه الحال سوف تكتب كود هذه الميزات بنفسك.

<Tip body="<b>نصيحة:</b> اكتب في قائمة المشاريع التي تود العمل عليها في المستقبل👇" />

![My contributions todo list](/uploads/getting-started-with-opensource/todo.png)



<span class="text-xl">👨‍💻 في هذا الدلبل سوف اشرح على باكج **PHP Laravel** تسمى `laravel-carbon-macros` وهيا باكج توفر functions للتعامل مع الاجازات في كل انهاء العالم, ولكن ينقصها دولة مصر.</span>

قبل ان نبدأ بالكود يجيب ان اجيبك على سؤال مهم 👇

## لماذا اكتب كود مجانا للناس الاخرين؟

  **الاجابة باختصار:** انت لا تكتب مجانا بطريقة غير مباشرة! انت ترد الجميل للمجتمع فبعد كل شيء معظم الباكجات او اطر العمل مجانية للاستخدام.


  **بالاضافة الى** مساهماتك في البرامج مفتوحة المصدر عبارة عن **CV on steroids** اقوى شيء ممكن يظهر مهاراتك في العمل. سوف تزيد فرصة قبولك في اي عمل بنسبة 80% اذا كان لديك تاريخ مساهمة في البرامج مفتوحة المصدر.

## ابدأ

بعد اختيار الباكدج او الريبو التي تود العمل عليها, اعمل لها `fork` 👇

![fork](/uploads/getting-started-with-opensource/fork.png)

> **Forking** هوا مثل النسخ واللصق كانك بتنسخ الكود من مكان الى اخر في github

### 1- انسخ رابط الريبو

![1](/uploads/getting-started-with-opensource/1.png)

### 2- افتح ال Terminal او vs code

- اكتب هذا الامر لنسخ الريبو

```bash
git clone https://github.com/nagi1/laravel-carbon-macros.git
```

- استبدل `nagi1` باسم مستخدم github الخاص بك و `laravel-carbon-macros` باسم الباكدج

- سوف يظهر لك ملفات الريبو على جهازك 👇

![2](/uploads/getting-started-with-opensource/2.png)

### 3- تعرف على دليل المساهمة

**اضمن قبول مساهمتك (PR) بالتباعك للقواعد**. معظم المشاريع مفتوحة المصدر لديها دليل مساهمة او ما يسمى `CONTRIBUTING.md` احرص على قراءة هذا الدليل قبل البدأ باي مساهمة.

![contributing.md](/uploads/getting-started-with-opensource/contributing-file.png)

<Tip body="<b>نصيحة:</b> افتح الPRs المساهمات من المطورين الاخرين وخذ فكرة عن المشاكل التي تواجهم وطريقة كتابة الكود."/>

## ابدا بتحميل depandancies

لان هذا مشروع php laravel فهو يستخدم `compoesr`, في البداية يجيب تحميل كل الdependacices للمشروع لبدأ العمل عليه

```bash
composer install
```

<Tip body="<b>ملاحظة</b> اذا كان هذا مشروع جافاسكربت سوف تستخدم npm او yarn." />

## معرفة كيفية العمل مع الكود

<DangerBox body="<b>ملاحظة مهمة:</b> الكود التالي هوا باستخدام php laravel ولكن لا تقلق اذا كنت لا تجيده لا مشكلة هوا فقط لمجرد التمثيل ولكن الفكرة واحدة في اي لغة." />

**المطلوب:** اضافة الاجازات المصرية لمصر

اذهب الى مجلد `src` في الغالب يوجد الكود بداخله

![src](/uploads/getting-started-with-opensource/src-folder.png)

### اتبع العادات و التقاليد في الكود

![Follow convention](/uploads/getting-started-with-opensource/dates.png)


في الكود اعلاه ☝ سوف ترى كيف ان المطورين الاخرين يتبعون طريقة بسيطة في سمية المجلدات عبارة عن اسم الدولة ثم كلمة اجازة بالانجليزي holidays وهذا ماسنفعله تحديدا.

## الكود

افتح اي مجلد عشوائي وليكن `CanadianDates.php` وانسخ الكود

![3](/uploads/getting-started-with-opensource/3.png)

### انشئ ملف جديد بطريقة التسمية المتبعة

نسخت `CanadianDates.php` الى `EgyptianHolidays.php`

![4](/uploads/getting-started-with-opensource/4.png)

### اضف مساهمتك


بدأت باضافة **اجازات مصر** كما اضفت ايضا بعض التعليقات للمطورين الاخرين.

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

من اهم اسباب عدم قبول مساهماتك على github هيا ان المطورين لا يضيفون tests الى الكود الذي يكتبونه او يتوقعون ان المسؤول سوف يكتب الاختبار.

اضفة بعض الtests للكود 👇

![8](/uploads/getting-started-with-opensource/8.png)

## اعمل commit للشغل المنتهي

بعد الانتهاء من العمل على ميزة اعمل commet لحفظ نقطة العمل ولا تنسى ان تكتب رسالة جميلة 👇

![commit](/uploads/getting-started-with-opensource/commit.png)

## اكتب docs للكود

سوف يكون من الرائع ان توثق الميزة التي عملت عليها لكي يعرف الشخص المسؤول عن الريبو او المطورين الاخرين كيف يستخدمون الميزة بشكل فعال.

معظم الريبو مفتوحة المصدر تفضل وضع التوثيق في ملف `readme.md` او في مجلد مخصص `docs`.

![docs](/uploads/getting-started-with-opensource/docs-folder-struc.png)

فتحت مجلد `docs` ووجدت ان كل دوله لها ملفها الخاص, فنسخت ملف اي دولة وسميته `egypt.md`.

### ضع لمستك

فتحت احد ملفات الدول الاخرى وجدت ان التنسيق سيء نوعا ما

![docs](/uploads/getting-started-with-opensource/other-docs-example.png)

ليست افضل دوكس في العالم 😂

ضفت ملستي على الدوكس فاصبح شكلها اجمل من الاول 👇

![docs after](/uploads/getting-started-with-opensource/11-docs.png)

## اعمل test

شغل ال test للتأكد من ان كل شيء يعمل بشكل جيد.

![Final test](/uploads/getting-started-with-opensource/Final-test.png)

## Commet and submit a PR

بعد الانتهاء من تنفيذ الميزة الخاصة بك وكتابة المستندات ، ثم اعمل commit لشغلك.

حان الوقت لعمل  `PR`:

- اذهب للريبو المنسوخة مش الريبو الاصلية ثم اضغط على زر `Open pull request` 👇

![Contribute](/uploads/getting-started-with-opensource/contribute.png)

![Contribute-2](/uploads/getting-started-with-opensource/contri-2.png)

### اكتب عنوان واضح لعملك

![Contribute-3](/uploads/getting-started-with-opensource/contrib-3.png)

## انتظر ال PR الى ان تقبل او ترفض

بعد تقديم طلبك PR سوف تنتظر بعض الوقت لحين قبول الشخص المسؤول عن الريبو لطلبك بناءا على تواجدهم وقواعدهم لقبول الطلبات.

![Contribute-4](/uploads/getting-started-with-opensource/contrib-4.png)


<Tip body="من فضلك كن لطيف, وانتظر المسؤول عن الريبو ان يقبل ال PR واياك ان تسبام الissues كل شخص له حياة وجدوله المشغول." />

![Late PR](/uploads/getting-started-with-opensource/late-pr.png)

## الخاتمة

هذه نهاية هذا المقال ولكنها بداية مشوراك في البرامج مفتوحة المصدر, اتمنى ان تشجعك هذه المقالة على خطواتك الاولى تجاه مشاركة العالم كودك الرائع!

اذا استمتعت بقرائة المقالة اتركلي تعليق في قسم التعليقات 👇 او ارسلي رسالة على تويتر. [@nagiworks](https://twitter.com/nagiworks)
