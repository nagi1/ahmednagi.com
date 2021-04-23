---
title: "ازاي ترفع مواقع اللارفيل باحترافية على السرفر باستخدام Bitbcket"
image: /covers/laravel-deploy-bitbucket-ar.png
permalink: ar/laravel-deploy-bitbucket
subtitle: "ما تخليش الموقع بتاعك يقع ولا ثانية"
date: "2021-04-18 22:20"
description: "هتتعلم ازاي تقدر تعمل ترفع الموقع بتاعك على السرفر بطريقة احترافية ماتخليش الموقع يقع ولا ثانية"
tags:
  - envoy
  - bitbucket
  - deploy
  - pipelines
  - laravel
---

في الرحلة دي هكون الدليل بتاعك لازاي تقدر ترفع مواقع اللارفيل بتاعتك على اكتر من سيرفر بالستخدام CI و Pipeline اللي هيخلي حياتك سهلة وسلسه وكمان هيرفع الموقع بدون ماحد يحس وبدون مايقع ولا ثانية.

البوست دا تيكنيكال ومفصل جدا وفيه اكواد كتير ولكن على قد ماقدرت حاولت استحدام كلمات بسيطة لوصف المصطلحات المعقدة,
ومع ذلك اي كود هتنسخو هيشتغل على طول!

![Deployment doesn't have to be war](/uploads/Slide2.PNG)

## خريطة الرحلة

- [قبل ما نبدأ](#قبل-ما-نبدأ)
  - [تأكد ان عندك SSH للسيرفر](#تأكد-ان-عندك-ssh-للسيرفر)
  - [اعمل bitbucket repo](#اعمل-bitbucket-repo)
  - [ظبط اعدادات الريبو و بيئة الرفع](#ظبط-اعدادات-الريبو-و-بيئة-الرفع)
    - [انشاء ملف bitbucket-pipeline.yaml](#انشاء-ملف-bitbucket-pipelineyaml)
    - [انشاء ملف Envoy.blade.php](#انشاء-ملف-bitbucket-pipelineyaml)
- [اخطأ هتسهرك هتحيرك](#اخطأ-هتسهرك-هتحيرك)
- [ازاي كل حاجة مترابطة ببعضها؟](#ازاي-كل-حاجة-مترابطة-ببعضها)
  - [نظرة عامة عن خطوات تنفيذ الاوامر](#نظرة-عامة-عن-خطوات-تنفيذ-الاوامر)
  - [شرح محتويات مجلد البرودكشن](#شرح-محتويات-مجلد-البرودكشن)
  - [السرفرات المتعرفه جوا Envoy.blade.php](#السرفرات-المتعرفه-جوا-envoybladephp)
  - [خلينا نعرف الاسكربتات جوا ال Envoy](#خلينا-نعرف-الاسكربتات-جوا-ال-envoy)
    - [Rsync](#rsync)
    - [Setup Symlinks](#setup-symlinks)
    - [Verify Install](#verify-install)
    - [Activate Releases](#activate-releases)
    - [Migration](#migration)
    - [Additional tasks](#additional-tasks)
  - [قوة ال Symlink](#قوة-ال-symlink)
  - [bitbucket-pipeline.yaml](#bitbucket-pipelineyaml)
- [كلمات اخيرة](#كلمات-اخيرة)

## قبل ما نبدأ

في السكشن دا:

- [تأكد ان عندك SSH للسيرفر](#تأكد-ان-عندك-ssh-للسيرفر)
- [اعمل bitbucket repo](#اعمل-bitbucket-repo)
- [ظبط اعدادات الريبو و بيئة الرفع](#ظبط-اعدادات-الريبو-و-بيئة-الرفع)

### تأكد ان عندك SSH للسيرفر

في الاول, لازم يكون عندك ssh للسيرفر اللي هترفع عليه `cd` ادخل على الفلدر الرئيسي او المكان اللي عاوز ترفع عليه على السرفر في الغالب هيكون في المسار ده `/home/example.com/public_html/` واعمل فولدر اسمو "production".

```bash
cd /home/example.com/public_html
mkdir production
```

### اعمل bitbucket repo

الخطوة دي اختيارية اذا المشروع بتاعك بالفعل على bitbucket ممكن تعدي الخطوة دي للي بعدها.

اعمل برانش سميه `master` او `production` اللي تشوفو واللي يناسبك, اي بوش هتطلع على البرانش دا هتفعل عملية رفع و هتستخدم متغيرات البئية اللي هنعملها سوى في السكشن اللي جاي.

### ظبط اعدادات الريبو و بيئة الرفع

في ال bitbucket روح ل `Repository settings` وبعدين ل `Repository variables`

![Navigate to repository settings](/uploads/bitbucket_repo_settings.png)

هنا هتلاقي كل المفاتيح او الاعدادات السرية اللي اكيد مش هتعوز انها تكون مكشوفة في حته عامة.
ضيف `DEPLOY_HOST` و `DEPLOY_USER` في المتغيرات الاتنين دولا هيشيلو ال ip بتاع السرفر و اليوزر اللي هيعمل عملية الرفع عليه.

<DangerBox body="انتبه! خلي بالك ماتخليش ال DEPLOY_USER يكون root, ده مش مستحسن خالص, خلي المستخدم اللي هيعمل عملية الرفع يكون محدود واخرو يأكسس الفولدر بتاع الرفع فقط." />

بعد كدا هنظبط اعدادات بيئة الرفع سواءا كانت production او staging في ال `Deployments` هتخش وهتضيف `DEPLOY_PATH` اللي هتشيل مسار الرفع لحد فولدر ال production.

![Navigate to Deployments settings](/uploads/bitbucket_deployment_settings.png)

بعد كدا هتخلي ال bitbucket pipeline يأكسس السرفر بتاعك بالستخدام اليوزر بتاع الرفع هتدخل على تاب ال `SSH Keys` وهتعمل generate new key اذا ماعملتش كدا قبل كدا, بعدها هتنسخ ال `publick key ` لملف ال  `.ssh/authorized_keys` على السرفر ولكن خلي بالك انك تنسخو على الملف بتاع اليوزر بتاع الرفع في الغالب المسار هيكون `/home/example/.ssh`.

<WarningBox body="<b>خلي بالك من الخطأ دا</b>, ماتنسخش ال public key لل .ssh بتاع ال root user كدا ال bitbucket هيكون عندو صلاحيات الروت تأكد انك تنسخو على اليوزر بتاع الرفع."/>

اذا لأي سبب من الاسباب فولدر ال `.ssh` ماكنش موجود تقدر تضيفو بسهولة من خلال الامر التالي:

```bash
ssh-keygen -t rsa
```

بعد ما تنفذ الامر دا هيقلك `Enter file in which to save the key (/home/example/.ssh/id_rsa):` تأكد من مسار الملف كويس.

- اختياريا تقدر تتأكد من ان ال pipeline يقدر يدخل على السرفر بالضغط على زرار `Fetch` اللي هيعرف ال bitbucket على ال ip بتاع السرفر.

<hr/><br/>

#### انشاء ملف bitbucket-pipeline.yaml

بعد كدا خش على مجلد المشروع بتاعك واعمل ملف اسمو `bitbucket-pipeline.yaml` الوقتي حاول [تنسخ محتويات الملف من هنا](https://gist.github.com/nagi1/6a19ddd5504f514fa701d1e58075baa3) ولو عاوز تعرف شرح الملف دا كمل قراءة هتعرف :)

الملف اللي لسه ناسخو دا فيه بيئات رفع مختلفة Deployment Enviroments هما `staging` و `production` لو حابب تقدر تضيف او تحذف في البيئات دي بعد ما [تقرا السكشن دا كويس](#bitbucket-pipelineyaml)!

#### انشاء ملف Envoy.blade.php

هتعمل ملف اسمو `Envoy.blade.php` في مجلد المشروع بتاعك وتاني [حاول برضو تنسخ محتويات الملف من هنا](https://gist.github.com/nagi1/c06faa11dc4dffeeebfd0429094ab99d) وبعدين بص على الشرح بعد ما نخلص مش لازم تعمل اي حاجة فيه الوقتي. لو حابب تعرف محتوايته حالا ممكن تنط للسكشن دا من [هنا](#خلينا-نعرف-الاسكربتات-جوا-ال-envoy).

## اخطأ هتسهرك هتحيرك

انا قعد ساعات طويلة في الخطأ دا, سرفر الاباتشي ماكنش قادر يقرأ ملف ال `storage` لما بحدث فيه وكان بيظهرلي المجلد القديم ال cached ودا كلو لان ال symoblic link او الرابط بتاع المجلد اللي اسمو `current` في مجلد ال `production` ماكنش الاباتشي  ماشي معاه بمعنا انه كان بيظهر النسخة المتكيشة مش المجلد الفعلي, المهم بعد 25 كباية قهوة عرفت الخطأ انه نسيت احط السطر دا في ملف ال `.htaccess` في المجلد الاساسي بتاع الرفع `public_html`.

```txt
Options +FollowSymLinks
```

السطر دا هيخلي سرفر الاباتشي يحمل الملفات اللي جوا ال symoblic link صح.

## ازاي كل حاجة مترابطة ببعضها؟

خلينا ناخد خطوة لورا ونبص على ازاي كل حاجة بتشتغل ومترابطة ببعضها وعلى انهي سيرفر الاوامر هتتنفذ.

### نظرة عامة عن خطوات تنفيذ الاوامر

![Overview?](/uploads/Slide19.PNG)

1- لما تعمل push لاي كود جديد على البرانش بتاعك ال pipeline هيشغل عملية رفع جديدة اللي متعرفة في ملف ال `bitbucket-pipeline.yaml`.

2- ال pipeline هيقوم دوكر كونتينر حاجة زي سيرفر منعزل مخصوص للرفعة دي عشان يبني فيها ال php هيعمل فيها composer install والناتج عن العملية دي هتكون ملفات المشروع بتاعك + ملف ال `vendor`.

3- بعد كدا ال Task runner اسمو [Envoy](https://laravel.com/docs/8.x/envoy) هيشغل كل الاوامر والخطوات اللي جوا الملف `Envoy.blade.php` على ال pipeline وعلى السرفر بتاعك.

### شرح محتويات مجلد البرودكشن

خلينا نلقي نظرة على هيكلة المجلدات جوا مجلد ال `production` على السرفر.

- `releases` يحتوي على اصدار من كل push متعلمة بالتاريخ.
- `.env` ملف .env العادي بتاع البرودكشن بس الملف دا هيكون متشير مابين كل الاصدارات.
- `storage` مجلد ال storage العادي بس هيكون برضو متشير مابين كل الاصدارات.

![Production directory structure](/uploads/Slide21.PNG)

### السرفرات المتعرفه جوا Envoy.blade.php

`Envoy.blade.php` بيعرف 2 سرفر هما:

- `web` اللي بيمثل السرفر بتاعك.
- `localhost` اللي بيمثل الكونتينر بتاعت pipeline على bitbucket.

### خلينا نعرف الاسكربتات جوا ال Envoy

#### Rsync

- اول خطوة هتشتغل على `localhost`. بينقل او بيحول ملفات المشروع كلو واي نواتج مثل مجلد ال vendor من سيرفر bitbucket للسرفر او للمجلد بتاعك اللي متعرف في `DEPLOY_PATH`.

![First Task Rsync](/uploads/Slide20.PNG)

#### Setup Symlinks

- بيربط `.env` اللي موجود في مجلد `production` بأحدث اصدار موجود في مجلد ال `releases`.
- بيشوف لو الاصدار فيه مجلد ال `storage`, بينقلو لمجلد backup وبعدها بياخد symlink لل احدث اصدار موجود في ال `releases`.
- بيربط ال `storage` ب `public/storage`. زي اللي بيعملو `php artisan storage:link`.

![Setup Symlinks 1](/uploads/Slide22.PNG)

![Setup Symlinks 2](/uploads/Slide23.PNG)

#### Verify Install

"**verify_install**", هنا تقدر تضيف اي اوامر عشان تتأكد من ان الاصدار دا شغال انا هنا عملت حاجة بسيطة `artisan --version`.

#### Activate Releases

"**activate_release**", عمل symlink ل ملف ال `current` مع اجدد اصدار في مجلد ال `releases`.

![activate_release](/uploads/Slide24.PNG)

<WarningBox body="مهم جدا لازم تظبط السرفر بتاعك سواءا كان Nginx او Apache انو يقرأ الدومين بتاعك من ملف ال current يعني في الاخر هيكون المسار كدا path-to-production-dir/production/current/public"/>

![activate_release 2](/uploads/Slide25.PNG)

#### Migration

"**migrate**", اعمل اي حاجة ليها علاقة بالداتابيس او migration هنا لازم تستخدم فلاج `--force` عشان انت في البرودكشن لو ماستخدمتوش التاسك مش هتشتغل.

#### Optimizations

"**optimize**", هنا او حبيت تعمل اي optimizations للاصدار بتاعك.

**نصيحة**: استخدم امر  `php artisan optimize:clear` عشان تنضف كل الكاشات بتاعتك وبعدها امر `php artisan optimize` عشان تكيش كل حاجة تاني.

#### Additional tasks

"**additional_tasks**", هنا لو حابب تعمل اي تاسكات اضافية زي انك تنشر الترجمات او ال views.

### قوة ال Symlink

لو حظك حلو ومشيت كل الخطوات من هنا ورايح كل push لل master اللي انا بفترض انك بتستخدمو ك production هيترفع على السرفر كأصدار جديد, السحر هنا بقا ان ملف ال `current` دائما بيبص على اخر اصدار شغل من الكود بتاعك ولما بتpush اي كود جديد ال `current` هيبص على الاصدار الجديد دا في ثانية بدون اي تأخير وبكدا هتكون حققت ال zero downtime deployment. الحلو في الموضوع برضو ان كل الاصدارت القديمة هتكون محفوظة على السرفر يعني لا قدر الله حتى لو الاصدار عدى من كل شيئ وطلع بايظ تقدر ترجع ورا للاصدار القديم اللي كان شغال. ايه رايك يا معلم!

![Final overview](/uploads/Slide26.PNG)

### bitbucket-pipeline.yaml

الملف دا بيحتوي على خطوات هتشتغل على pipeline زي نوع الدوكر او اصدار ال php, البرانشات اوالاسكربتات وحجات تانية كتير.

خلينا نبص عليه بصة سريعة:

```yaml
image: php:7.4-fpm
```

انا بالنسبالي كان مهم ان الpipeline يكون سريع جدا يعني مايخدش اكتر من دقيقتين عشان كدا انا هنا استخدمت صورة دوكر مخصوصة للphp النسخة دي فيها بيئة محدودة ومختصرة عشان تشغل اللphp باسرع وقت ممكن طبعا انت مش ملزم بنفس النسخة دي وتقدر تجرب نسخ كتير جدا من على موقع docker.

<br/>
<hr />
<br/>

```yaml
  steps:
    - step: &composer-install
        name: Build PHP
        caches:
          - composer
        script:
          - ls -al
          - apt-get update && apt-get install -qy unzip git curl libmcrypt-dev
          - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
          - composer --version
          - composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader --prefer-dist --ignore-platform-reqs
        artifacts:
          - vendor/**
```

`definitions` بيعرف اي خطوات او متغيرات هتشتغل خلال فترة تفيذ ال pipeline run.

او حاجة عرفت ال composer install

- هتنزل الcomposer على الimage
- هتطبع اصدار الcomposer
- هتحمل ال vendor بس optimized
- هتكيش ال vendor عشان المرات الجاية يستخدمو ومايضطرش يحملو تاني.

مهم جدا انك `composer install`  عشان الvendor اللي هيطلع هيشتغل على البرودكشن ولازم يكون سريع وحجمو صغير.

<br/>
<hr />
<br/>

```yaml
    - step: &deploy-production
        name: Deploy (Production)
        deployment: Production
        caches:
          - composer
        script:
          - apt-get update && apt-get install -qy unzip git curl libmcrypt-dev rsync
          - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
          - composer --version
          - composer global require "laravel/envoy"
          - ~/.composer/vendor/bin/envoy run deploy --host=$DEPLOY_HOST --user=$DEPLOY_USER --path=$DEPLOY_PATH --build=$BITBUCKET_BUILD_NUMBER --commit=$BITBUCKET_COMMIT --branch=$BITBUCKET_BRANCH --php=php --dir=$BITBUCKET_CLONE_DIR
```


هنا الpipeline هينزل ال "rsync" و ال "[Laravel Envoy](https://laravel.com/docs/8.x/envoy)" على ال pipeline ويشغل ال Envoy
<br/>
<hr/>
<br/>

```yaml
pipelines:
  default:
    - step: *composer-install
    # - step: *npm-build
  branches:
    master:
      - step: *composer-install
      # - step: *npm-build
      - step: *deploy-production
```

جوا ال `pipelines` هنعرف الاوامر اللي هتحصل في كل branch.

## كلمات اخيرة

مش لازم تستخدم ال Bitbucket بعينو اي منصة فيها pipeline هتقدر تنفذ عليها الطريقة دي اهم شيء تكون فاهم الفكرة منصات زي Travis Ci او Github actions هيشتغلو زي الفل طالما ال pipeline له ssh على السرفر عشان يقدر يشغل الوامر بتاعت ال [Envoy](https://laravel.com/docs/8.x/envoy).

لو عندك اي سؤال او تعليق او عاوز تسلم عليا ممكن تسيب تعليق تحت او تتواصل معايا عن طريق تويتر [@nagiworks](https://twitter.com/nagiworks) هكون سعيد جدا بمساعدتك.
