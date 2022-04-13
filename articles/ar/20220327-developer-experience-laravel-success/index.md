---
title: 75% من سبب نجاح لارفيل يكمن في حرفين
image: /covers/laravel-dx.png
description: نظرة على تجربة المطور (DX) ونصائح يمكنك فعلها اليوم لتحسين طريقة كتابة الكود بدون التضحية بالوقت
permalink: ar/laravel-dx-experience
subtitle: "تجربة المطور (DX) - نظرة على سبب نجاح اطار عمل لارفيل"
date: 2022-04-13 16:00
tags:
  - Laravel
  - DX
  - guides
---

## النقاط

- [النقاط](#النقاط)
- [ما هي تجربة المطور (DX) ولماذا يجب أن أهتم؟](#ما-هي-تجربة-المطور-dx-ولماذا-يجب-أن-أهتم)
- [لماذا يجب ان اهتم على أي حال؟](#لماذا-يجب-ان-اهتم-على-أي-حال)
- [اهم اسباب نجاح إطار عمل لارفيل](#اهم-اسباب-نجاح-إطار-عمل-لارفيل)
  - [تعليقات على الكود مكتوبة بعناية فائقة](#تعليقات-على-الكود-مكتوبة-بعناية-فائقة)
  - [اهتمام جبار ب ال Documentation](#اهتمام-جبار-ب-ال-documentation)
  - [اسماء functions وكلاسات واضحة كالشمس](#اسماء-functions-وكلاسات-واضحة-كالشمس)
  - [مجتمع كبير متماسك](#مجتمع-كبير-متماسك)
- [لماذا تبنى لارفيل إطار عمل vue في البداية](#لماذا-تبنى-لارفيل-إطار-عمل-vue-في-البداية)
- [تأثير المدراء الغير تقنين على تجربة المطور](#تأثير-المدراء-الغير-تقنين-على-تجربة-المطور)
- [كيف تهتم بال DX دون المخاطرة بالوقت؟](#كيف-تهتم-بال-dx-دون-المخاطرة-بالوقت)
- [نصائح يمكنك فعلها اليوم لتحسين تجربة المطور](#نصائح-يمكنك-فعلها-اليوم-لتحسين-تجربة-المطور)
  - [1- بدل استخدام switch او if else متداخلة جرب هذه الطريقة](#1--بدل-استخدام-switch-او-if-else-متداخلة-جرب-هذه-الطريقة)
  - [2- نظم الشكل](#2--نظم-الشكل)
  - [3- لا تستخدم متغيرات بدون داعي](#3--لا-تستخدم-متغيرات-بدون-داعي)
  - [4- انشئ متغيرات لتوضيح](#4--انشئ-متغيرات-لتوضيح)
  - [5- قسم الكود الى functions](#5--قسم-الكود-الى-functions)
- [في النهاية](#في-النهاية)


## ما هي تجربة المطور (DX) ولماذا يجب أن أهتم؟

لن أبدأ بسرد تعريف نصي عن تجربة المطور كأنه من كتاب مدرسي ولكن دعنا نفهم تجربة المطور عن طريق مصطلح معروف لدى الغالبية وهوا تجربة المستخدم UX, **تجربة المستخدم تتضمن تحسين طريقة تفاعل المستخدم مع الموقع او التطبيق** مثل اختيار حجم الخطوط, تناسق الالوان او اماكن القوائم.

![Good UX vs Bad UX](/uploads/laravel-dx/goodux-vs-badux.png)

**تجربة المطور (DX) تشبه في حد كبير ال UX في أنها تهتم بتحسين حياة المستخدم في هذه الحالة المطور في استخدام الكود او ال API.** مثل اسماء functions و classes تعبر عن وظيفتها بدقة, تسهيل طريقة البدء باستخدام الكود او API, او كتابة تعليقات واضحة على الكود.

![Good UX vs Bad UX](/uploads/laravel-dx/better-code.jpg)

## لماذا يجب ان اهتم على أي حال؟

إذا كنت مطور فكر في المطورين الآخرين وهم يستخدمون الكود الذي تكتبه هل تعبر عن تعاطف معهم؟ يجب أن تهتم بتجربة المطور (DX) مثل اهتمامك بتجربة المستخدم (UX) واكثر ايضا,

المطورين مخلوقات ذو آراء حادة يتمسكون بأرائها لدرجة انهم مستعدون لخوض حروب عليها 😃 إذا كان الكود او منتجات الذي تعمل عليها تهتم بتجربة المطور سوف يتعاطف المطورين الآخرين معها لدرجة انهم سوف يدافعون عنها حتى الموت ومن الممكن أن تنشئ حولك مجتمع لا يمكن لأي قدر من الماركتينج ان يجلبه.

قد لا يعنيك الأمر كثيرا إذا كنت مطور تكتب كود لمشروع freelance لن يراه احد غيرك أو تعمل لدى شركة تطوير صغيرة تعمل على 170 مشروع في نفس الوقت. ولكن قد يعنيك الأمر لو كنت تكتب لشركة كبيرة أو مشروع مفتوح المصدر.يراه الالاف المطورين الاخرين.

## اهم اسباب نجاح إطار عمل لارفيل

### تعليقات على الكود مكتوبة بعناية فائقة

إن دققت في أي مشروع لارفيل, سوف تلاحظ شيء غريب ولكن في نفس الوقت جميل يدل على الوقت والجهد المبذولين في إخراج شيء له قيمة. تجد ان تايلور (مؤسس لارفيل) يحب ان يكتب تعليقاته فوق الكود بحيث تكون حوالي 60 - 70 حرف وكل سطر أقل بثلاث حروف عن السطر الذي يسبقه.

كان هذا سبب كافي في تبني أناس كثيرون لارفيل لأنه بين لهم بشيء صغير  لا يؤثر على أداة لارفيل ولكن يجعلك **تفكر اذا كان يهتم الى هذا الحد بالتفاصيل الصغيرة فما بالك بالكود نفسه!**

![Laravel comment](/uploads/laravel-dx/laravel-comment.png)


### اهتمام جبار ب ال Documentation

يتفق مجتمع لارفيل على شيء واحد هو أن لارفيل لديه أفضل docs لااطار عمل على الانترنت! يتم شرح كل شيء يمكن ان يفعله الإطار بتفصيل وبطريقة جذابة وسلسه للعين كما ان شكلها جمالي وتدعم الوضع المظلم. كل هذه أشياء صغيرة تساهم في الوقت الذي يقضيه المطور في استخدام الاطار (**DX**).

![Laravel Docs](/uploads/laravel-dx/laravel-docs.png)

### اسماء functions وكلاسات واضحة كالشمس

![Laravel clear code](/uploads/laravel-dx/laravel-clear-code.png)

ال ORM الخاص بلارفيل اسمه ليس صدفة (Eloquent) معناها بليغ وفصيح وهو كذلك بالفعل لانه حول كتابة Query قواعد البيانات من شكل قد لا يعبر عن ماهية ما يفعله الكود الى شكل تفهمه من أول نظرة على الكود.

![Laravel eloquent](/uploads/laravel-dx/laravel-clear-code.png)

ي الماضي كان دمج ال PHP مع HTML عناء اذا كنت تريد مثلا الاحتفاظ بالداتا المدخلة قديما عند عمل submit ل form ولكن في لارفيل تم اختصار هذا العناء في حط كود هنا يوضح النقطة دي

![Laravel blade](/uploads/laravel-dx/laravel-blade.png)
![Laravel blade 2](/uploads/laravel-dx/laravel-blade-2.png)

### مجتمع كبير متماسك

اعتقد ان هذا هو أهم سبب في نجاح لارفيل (المجتمع) حيث تجد مطورين كثيرون أنشأوا صداقات متعددة قوية على الإنترنت بسبب تجمع آرائهم على إطار عمل واحد! هذا المجتمع داعم جدا حيث خرج من بين أعضائها مجتمعات أخرى مثل Tailwind Css و Livewire كلهم يتبنون نفس فلسفة هذا الإطار.

## لماذا تبنى لارفيل إطار عمل vue في البداية

عند تنزيل للارفيل سوف تجد انه يأتي مع ملف ExampleComponent.vue, في اجتماع مع تايلور (مؤسس لارفيل) سأل أحد المطورين لماذا Vue وليس React؟

الإجابة كانت "في البداية جربت تبني  Reactjs ولكني وجدت انه يتطلب الكثير من الخطوات لتثبيته, انتقلت لتجربة vuejs وجدت أنني قادر على البدء باستخدام CDN مثل Jquery, كما أنه يتوافق بشكل مثالي مع Blade محرك ال views الخاص بروفايل

## تأثير المدراء الغير تقنين على تجربة المطور

هدف اي شركة او مشروع هو تحقيق اعلى ربح بأقل خسارة, قد لا يكون سبب هذه الخسارة واضحة في البداية امام اصحاب القرار, ولكن عدم الاستثمار/ الاهتمام في تجربة المطورين قد تكون بسبب في أخطاء فادحة تسبب في تأخر تسليم العمل أو أسوأ من ذلك ترك المطورين العمل وعدم قدرة فريق جديد على الإكمال بسبب رداءة جودة الكود المكتوب من الفريق السابق.

## كيف تهتم بال DX دون المخاطرة بالوقت؟

في البداية دعني أوضح ان اهتمامك بتجربة المطور او نظافة الكود لن تزيد من وقت المشروع بل بالعكس سوف تلاحظ على المدى الطويل في نهاية المشروع أو في فترة الصيانة سهولة العمل عليه مرة اخرى بفريق مختلف لن يكلفك 3 اسابيع اخرى لكي يفك تعقيدات المعكرونة في الكود.

**الحل اجعل تجربة المطور نمط حياتك اليومي.**

إذا كنت تستغرق من الوقت 10 ثواني لكتابة if statement على هيئة معكرونة كم الشكل بالاسفل سوف تستغرق من الوقت 7 ثوان في كتابة نفس ال if statement بطريقة أفضل.

![early return](/uploads/laravel-dx/early-return.png)

## نصائح يمكنك فعلها اليوم لتحسين تجربة المطور

### 1- بدل استخدام switch او if else متداخلة جرب هذه الطريقة

```php
// Bad
if ($order->product->option->type === 'pdf') {
    $type = 'book';
} else if ($order->product->option->type === 'epub') {
    $type = 'book';
} else if ($order->product->option->type === 'license') {
    $type = 'license';
} else if ($order->product->option->type === 'artwork') {
    $type = 'creative';
} else if $order->product->option->type === 'song') {
    $type = 'creative';
} else if ($order->product->option->type === 'physical') {
    $type = 'physical';
}

if ($type === 'book') {
    $downloadable = true;
} else if ($type === 'license') {
    $downloadable = true;
} else if $type === 'creative') {
    $downloadable = true;
} else if ($type === 'physical') {
    $downloadable = false;
}
```

```php
// Good
$type = [
    'pdf'      => 'book',
    'epub'     => 'book',
    'license'  => 'license',
    'artwork'  => 'creative',
    'song'     => 'creative',
    'physical' => 'physical',
][$order->product->option->type];

$downloadable = [
    'book'     => true,
    'license'  => true,
    'creative' => true,
    'physical' => false,
][$type];
```

### 2- نظم الشكل

```php
// Bad
// No line split
return $this->request->session()->get($this->config->get('analytics.campaign_session_key'));

// Meaningless line split
return $this->request
  ->session()->get($this->config->get('analytics.campaign_session_key'));
```

```php
// Good
return $this->request->session()->get(
  $this->config->get('analytics.campaign_session_key')
);

// Closure
new EventCollection($this->events->map(function (Event $event) {
  return new Entries\Event($event->code, $event->pivot->data);
}));

// Array
$this->validate($request, [
  'code' => 'string|required',
  'name' => 'string|required',
]);
```

### 3- لا تستخدم متغيرات بدون داعي

```php
// Bad
public function create()
{
  $data = [
    'resource' => 'campaign',
    'generatedCode' => Str::random(8),
  ];

  return $this->inertia('Resource/Create', $data);
}
```

```php
// Good
public function create()
{
  return $this->inertia('Resource/Create', [
    'resource'      => 'campaign',
    'generatedCode' => Str::random(8),
  ]);
}
```

### 4- انشئ متغيرات لتوضيح

```php
// Bad
Visit::create([
  'url' => $visit->url,
  'referer' => $visit->referer,
  'user_id' => $visit->userId,
  'ip' => $visit->ip,
  'timestamp' => $visit->timestamp,
])->conversion_goals()->attach($conversionData);
```

```php
// Good
$visit = Visit::create([
  'url'       => $visit->url,
  'referer'   => $visit->referer,
  'user_id'   => $visit->userId,
  'ip'        => $visit->ip,
  'timestamp' => $visit->timestamp,
]);

$visit->conversion_goals()->attach($conversionData);
```

### 5- قسم الكود الى functions

```php
public function handle(Request $request, Closure $next)
{
  // We extracted 3 tong methods into separate methods.
  $this->trackVisitor();
  $this->trackCampaign();
  $this->trackTrafficSource($request);

  $response = $next($request);

  $this->analytics->log($request);

  return $response;
}
```

[اكمل قرائة المزيد من هنا](https://sohambanerjee.me/2020/06/26/clean-code-laravel/)

## في النهاية

بسبب اهتمام لارفيل بتجربة المطور صار اكثر اطار عمل محبوب لدى المطورين يدافعون عنه مما حقق انتشار اكثر من اي وسيلة دعائية ممكن تحقيقة.

تجربة المستخدم تضمن اي شيء تفعله او تكتبه يسهل حياة المطور او المستخدم للكود من بعدك.
