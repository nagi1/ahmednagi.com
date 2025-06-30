---
title: 'ازاي تسرع ال PHP Tests بتاعتك باستخدام GitHub Actions'
image: /covers/parallel-testing-github-actions-en.png
permalink: /ar/speed-up-php-tests-parallel-jobs-github-actions
subtitle: 'قسم ال tests بتاعتك على عدة jobs وشغلهم مع بعض عشان توفر وقت كتير'
date: 2025-06-27 10:00
description: اتعلم ازاي تقسم ال Laravel tests بتاعتك على عدة GitHub Actions jobs وتشغلهم parallel عشان توفر وقت كتير في ال CI وتخلص بسرعة.
tags:
  - php
  - laravel
  - github-actions
  - testing
  - ci-cd
  - pest
  - phpunit
---

ال tests الطويلة دي مرهقة بجد. كنت بستنى اكتر من 15 دقيقة عشان ال CI يخلص وده كان بيخليني اتعب من الانتظار.

فاكتشفت طريقة اقسم بيها ال tests على jobs كتيرة وأشغلهم parallel. النتيجة؟ وقت ال tests قل من 15 دقيقة لـ 4 دقائق بس.

هشرحلك ال setup اللي انا بستخدمه دلوقتي. مش معقد بس محتاج تركيز شوية.

![Sequential vs Parallel Testing: قبل](/uploads/gh-actions-p1/gh-actions-before.png)

![Sequential vs Parallel Testing: بعد](/uploads/gh-actions-p1/gh-actions-after.png)

## ده لمين؟

لو انت مطور Laravel وبتواجه نفس المشكلة - tests بطيئة في ال CI - يبقا المقال ده ليك.

## المشكلة

كل ما بضيف features ال tests بتزيد وتبقا ابطأ. اللي كان 30 ثانية بقا 15 دقيقة في ال CI.

ال solution مش انك تشتري runners اقوى. ال solution انك تقسم ال tests وتشغلهم مع بعض.

---

## ال Setup

انا بستخدم 3 jobs:

```yaml
name: tests

on:
  push:
    branches: ['*']
  pull_request:
    branches: ['*']
```

بيشتغل على اي push او PR.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

لو عملت commits كتير ورا بعض، هيلغي القديمة ويشغل الجديدة بس. بيوفر فلوس.

---

## Job 1: البناء (`prepare`)

ده بيعمل build للـ app مرة واحدة. باقي ال jobs تاخد النتيجة.

```yaml
prepare:
  name: Prepare deps, assets & .env
  runs-on: ubuntu-latest
  container:
    image: lorisleiva/laravel-docker:8.3
```

بستخدم Docker container عشان ميحصلش مشاكل versions.

```yaml
steps:
  - uses: actions/checkout@v4
```

نزل ال code.

```yaml
- name: Disable Xdebug & OPCache for CLI
  run: |
    echo "xdebug.mode=off"      > /usr/local/etc/php/conf.d/disable-xdebug.ini
    echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/disable-opcache.ini
```

قفل Xdebug عشان مبطئ.

```yaml
- name: Install Node.js & npm
  run: apk add --no-cache nodejs npm
```

لو بتستخدم Filament او Inertia محتاج Node. لو Laravel API بس، شيل دي.

```yaml
- name: Cache Composer cache
  uses: actions/cache@v4
  with:
    path: ~/.composer/cache
    key: ${{ runner.os }}-composer-cache-${{ hashFiles('composer.lock') }}
    restore-keys: ${{ runner.os }}-composer-cache-
```

cache للتنزيلات.

```yaml
- name: Cache vendor
  uses: actions/cache@v4
  with:
    path: vendor
    key: ${{ runner.os }}-vendor-${{ hashFiles('composer.lock') }}
    restore-keys: ${{ runner.os }}-vendor-
```

cache للـ vendor folder.

```yaml
- name: Install PHP dependencies
  run: composer install --no-interaction --prefer-dist --no-scripts --no-progress
```

ثبت ال packages.

```yaml
- name: Cache Node modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('**/package.json') }}
    restore-keys: ${{ runner.os }}-node-modules-
```

cache للـ npm.

```yaml
- name: Install & build JS assets
  run: |
    npm ci --silent
    npm run build
```

build للـ frontend.

```yaml
- name: Copy test .env
  run: cp .env.example .env

- name: Generate application key
  run: php artisan key:generate --ansi
```

حضر Laravel.

```yaml
- name: Upload build & .env
  uses: actions/upload-artifact@v4
  with:
    name: build-env
    path: |
      public/build
      .env
```

ارفع النتيجة. ال test jobs هتنزلها.

---

## Job 2: ال Tests (`tests-be`)

هنا السحر. نقسم ال tests ونشغل كل جزء منفصل.

```yaml
tests-be:
  name: Run unit tests (BE)   shard ${{ matrix.ci_node_index }}/6
  needs: prepare
  runs-on: ubuntu-latest
  container:
    image: lorisleiva/laravel-docker:8.3
```

6 jobs في نفس الوقت.

```yaml
strategy:
  fail-fast: true
  matrix:
    ci_node_index: [1, 2, 3, 4, 5, 6]
    ci_node_total: [6]
```

كل job بياخد index مختلف. بيقسم ال tests بناء عليه.

```yaml
steps:
  - uses: actions/checkout@v4
```

كل job بيبدأ من الصفر.

```yaml
- name: Install GNU coreutils (for split -d)
  run: apk add --no-cache coreutils
```

محتاج `split` عشان اقسم ال tests.

```yaml
- name: Disable Xdebug & OPCache for CLI
  run: |
    echo "xdebug.mode=off" > /usr/local/etc/php/conf.d/disable-xdebug.ini
    echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/disable-opcache.ini

- name: Increase PHP memory limit
  run: echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory.ini
```

قفل Xdebug وزود الـ memory.

```yaml
- name: Cache Composer cache
  uses: actions/cache@v4
  with:
    path: ~/.composer/cache
    key: ${{ runner.os }}-composer-cache-${{ hashFiles('composer.lock') }}
    restore-keys: ${{ runner.os }}-composer-cache-

- name: Cache vendor
  uses: actions/cache@v4
  with:
    path: vendor
    key: ${{ runner.os }}-vendor-${{ hashFiles('composer.lock') }}
    restore-keys: ${{ runner.os }}-vendor-

- name: Install PHP dependencies (if not cached)
  run: composer install --no-interaction --prefer-dist --no-scripts --no-progress
```

نرجع ال PHP dependencies من ال cache.

```yaml
- name: Download build & .env
  uses: actions/download-artifact@v4
  with:
    name: build-env
    path: .
```

نزل الـ build وال `.env`.

```yaml
- name: Copy .env
  run: cp .env.example .env

- name: Generate application key
  run: php artisan key:generate --ansi
```

حضر Laravel.

```yaml
- name: Ensure Paratest cache dir exists
  run: mkdir -p storage/framework/cache
```

Paratest محتاج المجلد ده.

```yaml
- id: split
  uses: remarkablemark/find-and-split@v1
  with:
    directory: tests
    pattern: '*Test.php'
    chunk: ${{ matrix.ci_node_index }}/${{ matrix.ci_node_total }}
```

بيقسم ال tests لـ 6 مجموعات.

```yaml
- name: Run Pest (shard ${{ matrix.ci_node_index }})
  run: |
    FILES="${{ steps.split.outputs.files }}"
    PATTERNS=$(for f in $FILES; do basename "$f" .php; done | paste -sd '|' -)
    php -d memory_limit=-1 artisan test --filter "/($PATTERNS)/" --parallel \
      --cache-directory=storage/framework/cache --stop-on-failure
```

شغل ال tests بتاعت ال shard ده parallel.

---

## Job 3: خلاص (`finish-tests`)

```yaml
finish-tests:
  name: Finish tests
  needs: tests-be
  runs-on: ubuntu-latest
  steps:
    - run: echo "All shards passed!"
```

بيشتغل بس لو كل حاجة نجحت. ممكن تستخدمه لـ deployment او اشعارات.

---

## خلاصة

Setup بسيط وبيشتغل مع Pest و PHPUnit. الوقت بتاعي قل من 15 دقيقة لـ 4 دقائق.

لو عندك tests كتيرة اوي، ممكن تزود العدد من 6 لـ 8 او 10. او تضيف browser tests للـ matrix.

جربه وهتشوف الفرق بنفسك.

---

## ليه مقسمناش كله في job واحد؟

لو حطيت كل حاجة في job واحد، كل واحد من الـ 6 jobs هيعمل:

- يثبت Composer dependencies
- يثبت npm dependencies
- يبني frontend assets
- يحضر Laravel environment
- يشغل ال tests

ده شغل مكرر كتير.

بدل كده، بنعمل الشغل ده **مرة واحدة** في job منفصل وكل ال test jobs تاخد النتيجة الجاهزة. النتيجة؟ وقت اقل بكتير.

---

## الكود كامل

هنا الـ `.github/workflows/tests.yml` كامل:

```yaml
name: tests

on:
  push:
    branches: ['*']
  pull_request:
    branches: ['*']

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  # ────────────────────────────────────────────────────────────────
  # 1) Prepare: install, build, and bundle .env for all shards
  # ────────────────────────────────────────────────────────────────
  prepare:
    name: Prepare deps, assets & .env
    runs-on: ubuntu-latest
    container:
      image: lorisleiva/laravel-docker:8.3

    steps:
      - uses: actions/checkout@v4

      - name: Disable Xdebug & OPCache for CLI
        run: |
          echo "xdebug.mode=off"      > /usr/local/etc/php/conf.d/disable-xdebug.ini
          echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/disable-opcache.ini

      # ── Add Node.js (for npm build) ───────────────────────────────
      - name: Install Node.js & npm
        run: apk add --no-cache nodejs npm

      # ── Composer cache & install ─────────────────────────────────
      - name: Cache Composer cache
        uses: actions/cache@v4
        with:
          path: ~/.composer/cache
          key: ${{ runner.os }}-composer-cache-${{ hashFiles('composer.lock') }}
          restore-keys: ${{ runner.os }}-composer-cache-

      - name: Cache vendor
        uses: actions/cache@v4
        with:
          path: vendor
          key: ${{ runner.os }}-vendor-${{ hashFiles('composer.lock') }}
          restore-keys: ${{ runner.os }}-vendor-

      - name: Install PHP dependencies
        run: composer install --no-interaction --prefer-dist --no-scripts --no-progress

      # ── JS caches & build ─────────────────────────────────────────
      - name: Cache Node modules
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('**/package.json') }}
          restore-keys: ${{ runner.os }}-node-modules-

      - name: Install & build JS assets
        run: |
          npm ci --silent
          npm run build

      # ── Bundle .env & assets ─────────────────────────────────────
      - name: Copy test .env
        run: cp .env.example .env

      - name: Generate application key
        run: php artisan key:generate --ansi

      - name: Upload build & .env
        uses: actions/upload-artifact@v4
        with:
          name: build-env
          path: |
            public/build
            .env

  # ────────────────────────────────────────────────────────────────
  # 2) Test Shards: download artifact, restore cache, split & run
  # ────────────────────────────────────────────────────────────────
  tests-be:
    name: Run unit tests (BE)   shard ${{ matrix.ci_node_index }}/6
    needs: prepare
    runs-on: ubuntu-latest
    container:
      image: lorisleiva/laravel-docker:8.3

    strategy:
      fail-fast: true
      matrix:
        ci_node_index: [1, 2, 3, 4, 5, 6]
        ci_node_total: [6]

    steps:
      - uses: actions/checkout@v4

      - name: Install GNU coreutils (for split -d)
        run: apk add --no-cache coreutils

      - name: Disable Xdebug & OPCache for CLI
        run: |
          echo "xdebug.mode=off"      > /usr/local/etc/php/conf.d/disable-xdebug.ini
          echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/disable-opcache.ini

      - name: Increase PHP memory limit
        run: echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory.ini

      # ── Restore Composer cache & vendor ──────────────────────────
      - name: Cache Composer cache
        uses: actions/cache@v4
        with:
          path: ~/.composer/cache
          key: ${{ runner.os }}-composer-cache-${{ hashFiles('composer.lock') }}
          restore-keys: ${{ runner.os }}-composer-cache-

      - name: Cache vendor
        uses: actions/cache@v4
        with:
          path: vendor
          key: ${{ runner.os }}-vendor-${{ hashFiles('composer.lock') }}
          restore-keys: ${{ runner.os }}-vendor-

      - name: Install PHP dependencies (if not cached)
        run: composer install --no-interaction --prefer-dist --no-scripts --no-progress

      # ── Download build assets & .env ─────────────────────────────
      - name: Download build & .env
        uses: actions/download-artifact@v4
        with:
          name: build-env
          path: .

      - name: Copy .env
        run: cp .env.example .env

      - name: Generate application key
        run: php artisan key:generate --ansi

      - name: Ensure Paratest cache dir exists
        run: mkdir -p storage/framework/cache

      # ── Split tests & run Pest ───────────────────────────────────
      - id: split
        uses: remarkablemark/find-and-split@v1
        with:
          directory: tests
          pattern: '*Test.php'
          chunk: ${{ matrix.ci_node_index }}/${{ matrix.ci_node_total }}

      - name: Run Pest (shard ${{ matrix.ci_node_index }})
        run: |
          FILES="${{ steps.split.outputs.files }}"
          PATTERNS=$(for f in $FILES; do basename "$f" .php; done | paste -sd '|' -)
          php -d memory_limit=-1 artisan test --filter "/($PATTERNS)/" --parallel \
            --cache-directory=storage/framework/cache --stop-on-failure

  finish-tests:
    name: Finish tests
    needs: tests-be
    runs-on: ubuntu-latest
    steps:
      - run: echo "All shards passed!"
```

---

## استنى الجزء التاني قريب!

شغل ال parallel jobs ده بيسرع ال tests بشكل جامد، بس ايه اللي يحصل لما تعدي الـ 2,000 دقيقة المجانية بتاعت GitHub في الشهر؟ ممكن تلاقي نفسك بتدفع فلوس كتير مع ال GitHub-hosted runners العادية.

في **الجزء التاني** من السلسلة دي، هقولك ازاي تشغل GitHub Actions بـ **4 دولار بس في الشهر** باستخدام حلول رخيصة حتى لو انت بتشغل الاف دقائق tests.

هغطي ال self-hosted runners على cloud providers رخيصين، ال spot instances وازاي توفر فلوس، امتى يكون من المنطق تسيب ال GitHub-hosted runners، ومقارنات تكلفة حقيقية مع تحليل break-even.

مناسب للفرق اللي بتكبر ومحتاجة CI/CD اكتر من غير ما تكسر الميزانية. استنونا!
