---
title: ازاي قدرت اعمل كفرات للسوشيال ميديا بستخدام ال CSS
image: /covers/create-social-media-headers-ar.png
description: دليل مفصل هيساعدك على انشاء كفرات لصفحات السوشايل مديا بتاعتك وتخليها تمثل افضل صورة عنك بأستخدام الcss وبدون فوتوشوب
permalink: ar/create-social-media-headers
subtitle: "بدون استخدام فوتوشوب"
date: 2022-03-27 16:00
tags:
  - css
  - tailwindcss
  - headers
  - social
  - guides
---

النهادرة هتكلم معكم عن ازي قدرت اعمل كفرات للبروفايل بتاعي على لينكدان وتويتر باستخدام الCSS وازاي انت كمان تقدر تبدا بكل سهولة.

**الدليل دا مفهوش رغي كتير معظمو صور وخطوات. استمتعوا**

![Link Preview](/covers/create-social-media-headers-ar.png)

### كفرات زي دولا 👇

![Bookshelf twitter header](/uploads/create-social-media-headers/bookshelf.png)
![Programmer elephant header](/uploads/create-social-media-headers/first-header-dis-fixed.png)
![office header](/uploads/create-social-media-headers/office-header.png)

## بس ايه اهمية عمل االكافرات دي

بارثام [@Prathkum](https://twitter.com/prathkum) بدا مشواروا التقني بانو كان بشارك الحجات الجديدة اللي بيتعلمها عن ال CSS مع الناس من خلال انو كان بيعمل headers لبروفايل التويتر بتاعوا. مع مرور الوقت, بنا لنفسو جمهور كبير حولين الفكرة دي.

في اعتقادي قصة نجاحوا ترجع الى انو عرف يمثل شخصيتو والحجات اللي بيتعلمها من اول نظرة لما تبص على البروفايل بتاعو. ودا اللي هنجاول نحققو في المقال دا.

## يلا نبدأ

في البداية لازم نجمع افكار زي نعمل برينستورمينج للحجات اللي ممكن نحطها في االكافر بتاعنا. هكيلك تجربتي الشخصية وانا بعمل اخر كفر ليا على تويتر [كتب البرمجة على الرف](https://twitter.com/nagiworks/status/1507984983394291720).

## تجميع الافكار

عشان انا انسان بصري بتأثر بالصور اكتر من اي حاجة تانية, فأول حاجة عملتها رحت على [صور جوجل](https://images.google.com) وكتبت في مربع البحث `Web developer Twitter header` ودي بعض النتايج اللي ممكن تظهرك

![Web developer Twitter header google images results](/uploads/create-social-media-headers/google-images-search-results.png)

فضلت تقريبا 20 دقيقة ببص وبدور في الصورة لحد ما الصورة دي جذبت انتباهي 👇

![bookshelf](/uploads/create-social-media-headers/original-bookshelf-image.png)

فكرت اني ممكن اعبر عن لغات البرمجة او التقنيات اللي اعرفها بشكل غير مباشر بالكتب المرصوصة بالرف.

## البدأ فالشغل

عشان ماتشتتش ولا اضيع وقت باستخدم اسهل واسرع اداة اعرفها واللي هيا [Tailwindcss's Play](https://play.tailwindcss.com) فيها ميزة التحديث التلقائي يعني كل ما تكتب حاجة الصفحة يتعملها ريفريش تلقائيا ودا بيساعدني اشوف النتيجة بسرعة وبيختصر وقت كتير جدا.

### الالوان

الالوان هيا اول حاجة العين بتلاحظها فمهم جدا اننا نختارها كويس وتكون مناسبة ومتناسقة مع بعض في نفس الوقت.

<Tip body="🔥 ملحوظة على السخان : موقع ال Tailwindcss هوا افضل مكان ممكن تلاقي فيه الالوان بكل درجاتها <a href='https://tailwindcss.com/docs/customizing-colors'>Visit the Docs</a>" />

انا حبيت الدرجات الغامقة من اللون الرصاصي فبديت اني اجرب كذا درجة وكمان اجرب الوان مختلفة ممكن تتطلع متناسقة معاه.

![experiment 1](/uploads/create-social-media-headers/expirement-1.png)

![experiment 2](/uploads/create-social-media-headers/expirement-2.png)

### دور على اسهل جزء في الشغل وابدا بيه

غير اني بحب ابدا باسهل وابسط اداة متعود عليها بحب ادور على اسهل جزء في الشغل كلو وابدا بيه خصوصا لو الحوار فيه رسم وابداع, دا بيزود من روحي المعدنية وبيخليني متحفز لان بلاقي لو بديت بالجزء الصعب بواجه صعوبة وبزهق.

![experimenting](/uploads/create-social-media-headers/experment.png)

فوق هنا ☝ كنت بجرب وبمكس الالوان. دورت على اسهل جزء في الشغل لقيتو قفلة القوس `{` اللي على يمين الرف فقررات اني اجيبها SVG عشان مكسل اعملها بالCSS من الاول وكمان قررت ان كل اللوجهات هجيبها SVG مش هعملها من الصفر.

### شغل مزيكة وانتا بتشتغل

معرفش بالنسبالك بس بالنسبالي بحب اشغل مزيكة هادية جمبي وانا بشتغل خصوصا لو كان فيها فن او حتت ابداع بتساعدني على التركيز.

### اكتب كومنتات فوق كل سطر بتكتبو

الشغل بال HTML مش زي الشغل بلغات البرمجة العادية احيانا الكود بيكبر منك وبتلاقي نفسك بتضيع وقت كتير في الscroling والتدوير على قفلات التاجات, فعشان كدا بحب اكتب كومنتات فوق كل div اعرف ايه هيا وتبع ايه وقفلتها فين. بص على الكود اللي تحت عشان تفهم قصدي 👇

```html
          <!-- Book  Docker-->
          <div class="relative h-full overflow-hidden border-2 border-gray-500 rounded w-11 bg-neutral-100">
            <!-- Logo and lines container -->
            <div class="flex flex-col justify-center w-full h-full">
              <!-- Letters above logo -->
              <div class="absolute w-full h-1 font-bold text-center text-cyan-700 top-1">D</div>
              <div class="absolute w-full h-1 font-bold text-center text-cyan-700 top-5">E</div>
              <div class="absolute w-full h-1 font-bold text-center text-cyan-700 top-9">V</div>

              <!-- Docker logo -->

              <!-- letters bellow docker logo -->
              <div class="absolute w-full h-1 font-bold text-center text-cyan-700 top-24">O</div>
              <div class="h-1 w-full text-center text-cyan-700 font-bold absolute top-[7.3rem]">P</div>
              <div class="h-1 w-full text-center text-cyan-700 font-bold absolute top-[8.5rem]">S</div>
            </div>

            <!-- Overlay: Shiny layer like a shadow -->
            <div class="absolute inset-0 w-[20%] h-full bg-black/10"></div>
          </div>
          <!-- End of Book Docker -->
```

الالتزام بالكومنتات دي خلا الشغل ممتع وسهل في النسخ واللصق بدون ماتضيع وقت كتير في النسخ واللصق.

## مش لازم يكون معقد

الهدف هنا انك تستمتع وانتا بتعمل االكافر بتاعك ماتحسش وانتا بتعملو انك فالشغل فاستخدم اللغة او الطريقة اللي بتحبها مش شرط تمشي على الطريقة دي.

### استخدم ال Flexbox في كل حاجة

انا بحب استخدم ال Flexbox في اي مكان اقدر استخدمو فيه بيخلي التحكم في الديفات اسهل من اي حاجة تانية, خصوصا ان Tailwindcss بيوفرك كلاسات سهلة و مريحة زي `space-x-2`.

شوف الكود اللي تحت دا معظموا بالفليكس بوكس (بالمناسبة الكود دا بيرسم الشاشة السودة اللي على الشمال) 👇

```html
      <!-- left screen -->
      <div class="bottom-[6.5rem] absolute">
        <div class="relative w-48 h-32 left-5 bg-gray-700 border-[3px] border-gray-900">
          <!-- Sreeen content -->
          <div class="relative flex flex-col justify-between w-full h-full p-2">
            <!-- first line -->
            <div class="flex items-center w-full space-x-1">
              <div class="w-2 h-1 bg-white rounded-xl"></div>
                <!-- More code... -->
            </div>

            <!-- second line -->
            <div class="flex items-center w-full space-x-1">
              <div class="w-2 h-1 bg-white rounded-xl"></div>
                <!-- More code... -->
            </div>
          </div>
          <!-- Stand -->
          <div class="h-[3.3rem] w-[3.4rem] bg-gradient-to-b from-gray-200 to-gray-300 absolute left-[4.2rem] top-[7.8rem]"></div>
        </div>
      </div>
```

![Office header](/uploads/create-social-media-headers/office-header.png)

### ادوات مفيدة هتساعدك وتوفر عليك

هقلك الوقتي على شوية ادوات هتساعدك في بعض الحجات اللي ممكن تواجه فيها صعوبة:

#### Fancy Border Radius

الاداة دي بتساعدك على رسم الكيرفات المعقدة اللي لو اتشقلبت مش هتعرف ترسمها بال CSS.

[Fancy Boarder Radius](https://9elements.github.io/fancy-border-radius/) مجانية ومفتوحة المصدر

<UrlPreview url="https://9elements.github.io/fancy-border-radius" />

الادة سهلة جدا وتقدر تستخدمها بكل سهولة مع ال Tailwind, انا استخدمتها في رسم الكرسي والموس في الصورة اللي تحت 👇

![Office header border radius](/uploads/create-social-media-headers/office-header-fancy-border-rad.png)

```html
  <!-- chair container -->
  <div class="relative">
    <div class="absolute top-[17rem] right-[-5.5rem]">
      <div style="border-radius:71% 71% 43% 54% / 85% 89% 29% 23%;" class="w-40 bg-gray-900 h-36"></div>
      <div style="border-radius:50% 50% 50% 50% / 50% 39% 61% 50%;" class="w-32 h-10 ml-4 -m-3 transform bg-gray-900 rotate-2"></div>
      <div class="absolute left-[4.6rem] w-[0.9rem] h-12 rounded-xl bg-gray-900"></div>
    </div>

    <!-- Other code -->
 </div>
```

#### SVGREPO

SVG مجانية لكل الاشكال اللي تخطر على بالك ممكن تساعدك في الرسم.

<UrlPreview url="https://www.svgrepo.com/" />

جبت الفيل الجميل دا من svgrepo 👇

![Office header](/uploads/create-social-media-headers/svg-elephant.png)

<DangerBox body="خلي بالك ان بعض ال SVG بيكون الكود بتاعها كبير جدا, بس لحسن الحظ الاداة اللي بعد دي بتحل المشكلة دي!" />

#### SVGOMG: Optimize your SVGs

اكتر اداة بحبها بالنسبة لل SVGs مجانية ومفتوحة المصدر بتصغر حجم صور ال SVG.

<UrlPreview url="https://jakearchibald.github.io/svgomg/" />

#### Tailwindcss official docs

افضل مكان ممكن تختار الالوان باختلاف درجاتها

<UrlPreview url="https://tailwindcss.com/docs/customizing-colors" />

#### High resolution display monitor

مهم  جدا ان يكون عندك شاشة كويسة والوانها دقيقة عشان تطلع كفر الوانو متناسقة.
افتكر ان اول كفر عملتو كان على لابي القديم الشاشة بتاعتو كانت على قدها والالوان اللي كانت بتعرضها بايظة خالص فاالكافر طلع كارثة من ناحية الالوان بص كدا 😂👇

![My First header](/uploads/create-social-media-headers/first-header-dis.png)

مالاحظتش الالوان مش مظبوطة الا لما شوفت االكافر من الموبايل بتاعي. بعدين صلتحها وبقا شكلها احلا 👇

![My First header fixed](/uploads/create-social-media-headers/first-header-dis-fixed.png)

#### Windows 10 cutter tool

بعد ما تخلص من االكافر وعشان تقدر ترفعو هتحتاج تحلو لصورة يفضل تكون **PNG**.

 `Snip & Sketch`.بحب الاداة لانها مجانية ومتوفرة على ويندوز 10 وبتقضي مصلحة بدون دوشة تقدر تلاقيها لما تسرش على

![Snip & Sketch](/uploads/create-social-media-headers/search-for-snip-and-sketch.png)

#### Free Image Resizer

كل منصة ليها مقاسات كفر مختلفة عن التانية وعشان ماتتعبش نفسك كتير في تظبيط حجم الصور الموقع دا هيساعدك انك تظبط الاحجام بدون ماتدفع ولا جنية.

<UrlPreview url="https://promo.com/tools/image-resizer/" />

هتكلم اكتر في موضوع مقاسات الصور في السكشن اللي بعد كدا [ازي تظبط مقاس الكافر](#resize-the-header-to-fit-perfectly).

![@nagiworks](/uploads/create-social-media-headers/my-twtter-page.png)

## ازاي تظبط مقاس الكافر على المنصة

معرفتك بمقاسات كل منصة مهم جدا عشانك تقدر تشتغل ساعات في رسم الكافر بتاعك وفي الاخر صورة البروفايل بتاعتك برضو تغطي عليه.

زي اللي حاصل في كافر البروفايل بتاعي على لينكيدان 👇

![My profile image blocks my beautiful header on linkedin](/uploads/create-social-media-headers/Inkedprofile-block-header-linkedin_LI.png)

في الحالة دي للاسف لازم نتقبل ان مقاس كافر اللينكدان صغير, لما لقيت الحوار كدا نقلت التلات كتب *(في حالتي كانو كتب laravel,vue,js)* لاقصى اليمين عشان يبانو اكتر.  الفكرة انك تعمل حسابك في ان حته من الكافر مش هتكون باينة.

في تويتر الوضع كان مختلف شوية لان الهيدر هنا مساحتو اكبر شوية, عشان تقدر تاخد افضل سكرين شوت للرسمة بتاعتك امشي على الخطوات دي:

### افتح الرسمة بتاعتك على اكبر شاشة عندك واعمل زوم لحد ما تغطي الشاشة كلها

![My profile image blocks my beautiful header](/uploads/create-social-media-headers/screencapture-play-tailwindcss.png)

### باستخدام اي اداة خد سكرين شوت بس خلي في مساحة جمب الرسمة

![My profile image blocks my beautiful header](/uploads/create-social-media-headers/screenshot-of-screenshot.png)

**دا هيديلك مساحة انك تزوم او تقطع من الصورة زي مانتا عاوز بعدين** 👇

![My profile image blocks my beautiful header](/uploads/create-social-media-headers/more-freadom-resizing.png)

**النتيجة النهائية** 👇

![My profile image blocks my beautiful header](/uploads/create-social-media-headers/profile-block-header.png)

## ماتنساش تشارك افكارك الابداعية

بعد ما ترسم الكافر وترفعو على البروفايل وتروق الدنيا ما نساش تعمل بوست تشرح ازاي قدرت تعمل كدا وايه فكرتو وايه التقنيات او اللغات اللي استخدمتها في الرسمة.

هكون مبسوط جدا لو شاركة كفراتك معايا على تويتر [@nagiworks](https://twitter.com/nagiworks).

اذا احتجت اي مساعدة عشان تبدا كلمني على اللينكدان او ابعتلي ايميل على [hi@ahmednagi.com](mailto:hi@ahmednagi.com).

## الخلاصة

- اثبات مهاراتك وحضورك اونلاين بيتطلب ابداع, والابداع حاجة تقدر تتعلمها.
- استخدم الطريقة اللي تريحك في رسم الكافر بتاعك بس انا بنصحك باستخدام Tailwindcss هتستمتع اوي وانتا بتشتغل بيه.
- ماتنساش تشارك الكافر بتاعك على السوشيال ميديا.

<span class="w-full text-2xl font-semibold text-center">استمر في البناء حتى لو لم يكن هناك من يراقب!</span>
