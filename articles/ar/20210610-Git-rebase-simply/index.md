---
title: Git rebase ببساطة
image: /covers/git-rebase.png
description: هنكلك تعقيد ال Git rebase الى الابد
permalink: ar/git-rebase-simply
date: 2020-06-10 16:00
tags:
  - git
---

في البوست دا هفترض انك عارف يعني ايه version control وايه مبادئ ال Git عشان هنخش على ال rebase على طول.

## هتكلم عن

[[toc]]

## ايه المشكلة اللي البتاع دا بيحلها؟

تخيل معايا انك شغال على ميزة feature في مشروع واخدت برانش عشانك ديفيلوبر شطور 😂 وانت في نص الشغل الحق البرودكشن بيولع 🔥🔥... بس الحمد الله زميلك التنين لحق وصلح الخطأ على البرانش الاساسي (master).

تمام الوقتي انت عاوز تكمل شغلك على الfeature بس المشكلة ان البرانش اللي خدتو عشان تشتغل فيه لسه عليه المصيبة. فطبعا انت عاوز تاخد التعديلات الجديدة (الاصلاحات بتاعت صاحبك) وتكمل عليها شغلك عادي هتعمل كدا ازاي؟!

## هنا تيجي فايدة الRebase

هوا بكل بساطة انك هتغير اساس (base) البرانش اللي انت واقف عليه ل اساس تاني عشان كدا اسمها Rebase!

خلينا نرجع للسيناريو بتاعنا اللي فوق وهنفترض ان الدنيا كانت ماشية تمام وان البرودكشن ماكنش بيولع كدا مش هيكون عندنا تغييرات حصلت في الmaster وبالتالي هنخلص الfeature بتاعتنا في امان ونعملها merge الطريقة دي هتكون اسمها Fast forward يعني انتقل من الحالة اللي الماستر كان مافهوش الfeature بتاعتك للحالة اللي فيها الfeature بتاعتك!

![Git rebase 1](/uploads/git-rebase/rebase-1.png)

خليني الاول اوضح شوية حجات على في الصورة m3 و m4 هيمثلو الاصلاحات بتاعت زميلك التنين.

f1 و f2 هيمثلو الميزة feature اللي شغال عاليها حاليا

m2_base هيمثل البرانش الاساسي قبل ما تعمل حاجة وقبل ما الايرور اللي على البرودكشن يحصل.

طيب الوقتي احنا عاوزين نحل المشكلة وفي نفس الوقت ما نعقدش ال history بتاعنا لو استخدمنا الطريقة التقليدية في الmerge اللي كانت هياخد اخرتعديلات في ال master واخر تعديلات من ال f2 وهيقارنهم بال m2_base اللي هوا الاساسي وهيدمجهم في بعض ولو فيه conflicts هتصلحها .

لو استخدمت ال Rebase وانت واقف على الf2 هتعمل

```bash
git rebase master
```

![Git rebase 2](/uploads/git-rebase/rebase-2.png)

كدا هنكون نقلنا اساس ال f2 خليناه شايل التعديلات (الاصلاحات) اللي حصلت في ال master وhistory بتاعنا هيكون مستقيم بدون اعوجاج 👇👇 .

![Git rebase 3](/uploads/git-rebase/rebase-3.png)
![Git rebase 3](/uploads/git-rebase/rebase-4.png)
![Git rebase 3](/uploads/git-rebase/rebase-5.png)
![Git rebase 3](/uploads/git-rebase/rebase-6.png)
![Git rebase 3](/uploads/git-rebase/rebase-7.png)

ولما بقول لازم نحافظ على ال history يكون مستقيم على قد ما نقدر مش معناه عشان نحافظ على منظرو الجمالي بس ولكن نحافظ على تسلسل الاحداث المهمة ال relevant لما تحب ترجع ورا بالتاريخ على الfeature اللي كنت شغال عليه ماترجع عليها ولسه في الخطأ اللي كان موقع البرودكشن وتعيد نفس المشكلة!

معرفش بس انا كنت مستغرب من نفسي اني بقالي سنين بستخدم ال git rebase وانا مش فاهم بالظبط هيا بتعمل ايه لحد ما جاه احمد صلاح وشرحهالي باكتر طريقة مبسطة في العالم كلو.

البوست دا كان عبارة عن تبسيط وشرح للصور اللي عملها احمد صلاح في شرح ال git rebase و انواع ال merge.

👇👇 Ahmed Salah

<UrlPreview url="https://www.linkedin.com/in/ahmed-salah-a847841b5" />