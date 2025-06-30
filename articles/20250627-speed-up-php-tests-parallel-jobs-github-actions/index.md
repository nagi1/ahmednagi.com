---
title: 'How to Speed Up PHP Tests with Parallel Jobs in GitHub Actions'
image: /covers/parallel-testing-github-actions-en.png
permalink: /speed-up-php-tests-parallel-jobs-github-actions
subtitle: 'Split your Laravel test suite across multiple GitHub Actions jobs to reduce test time significantly'
date: 2025-06-27 10:00
description: Learn how to split your Laravel or PHP test suite across multiple GitHub Actions jobs and run them in parallel, reducing total test time significantly with proper caching and environment reuse.
tags:
  - php
  - laravel
  - github-actions
  - testing
  - ci-cd
  - pest
  - phpunit
---

Long test runs slow you down. If you're running your Laravel or PHP test suite sequentially in CI, you're likely wasting time and compute resources.

This guide shows you how to split your test suite across multiple GitHub Actions jobs and run them in parallel, reducing total test time significantly. I'll walk through a real setup I use in production and explain why each piece matters.

The approach covers preparing a Laravel environment once and reusing it, automatically splitting your test suite, effective caching, and running parallel test shards with Pest or PHPUnit.

![Sequential vs Parallel Testing Diagram: before](/uploads/gh-actions-p1/gh-actions-before.png)

![Sequential vs Parallel Testing Diagram: after](/uploads/gh-actions-p1/gh-actions-after.png)

## Who This Guide Is For

You're likely mid-to-senior level, comfortable with CI/CD workflows, and working on a Laravel app. You might be using Pest or PHPUnit. If your project is growing and test runs are getting slower, this post is for you.

## Why Parallelization?

Test suites grow with features. What used to take 30 seconds locally now takes 15 minutes in CI. You don't need more powerful runners—you just need to split the work.

The solution is dividing your test suite into "shards" and running each shard in its own job concurrently, while reusing a shared environment to avoid redundant work.

---

## Workflow Overview

Here's the actual `tests.yml` GitHub Actions workflow I'll break down:

```yaml
name: tests

on:
  push:
    branches: ['*']
  pull_request:
    branches: ['*']
```

Triggers the workflow on any push or pull request across all branches—useful for testing feature branches, forks, or long-lived environments.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

If multiple commits are pushed to the same PR or branch quickly, only the latest run stays active—saving compute minutes and avoiding redundant jobs.

---

## Job 1: Build Once, Reuse Everywhere (`prepare`)

This job does all the heavy lifting—building your app and preparing the `.env`. It runs only once, and the output is reused in all test jobs.

```yaml
prepare:
  name: Prepare deps, assets & .env
  runs-on: ubuntu-latest
  container:
    image: lorisleiva/laravel-docker:8.3
```

Running inside a Docker container mirrors production/local dev environments exactly and avoids version mismatches.

```yaml
steps:
  - uses: actions/checkout@v4
```

Pulls in your code for dependency installation.

```yaml
- name: Disable Xdebug & OPCache for CLI
  run: |
    echo "xdebug.mode=off"      > /usr/local/etc/php/conf.d/disable-xdebug.ini
    echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/disable-opcache.ini
```

Disables Xdebug and OPcache, which can slow down CLI-based scripts like Composer or Artisan commands.

```yaml
- name: Install Node.js & npm
  run: apk add --no-cache nodejs npm
```

Installs Node.js. **Only needed** if your app builds frontend assets—like in Filament apps. Skip this for API-only Laravel apps.

```yaml
- name: Cache Composer cache
  uses: actions/cache@v4
  with:
    path: ~/.composer/cache
    key: ${{ runner.os }}-composer-cache-${{ hashFiles('composer.lock') }}
    restore-keys: ${{ runner.os }}-composer-cache-
```

Caches global Composer downloads. This reduces install time if dependencies haven't changed.

```yaml
- name: Cache vendor
  uses: actions/cache@v4
  with:
    path: vendor
    key: ${{ runner.os }}-vendor-${{ hashFiles('composer.lock') }}
    restore-keys: ${{ runner.os }}-vendor-
```

Caches the installed packages themselves (`vendor/`) for even faster performance.

```yaml
- name: Install PHP dependencies
  run: composer install --no-interaction --prefer-dist --no-scripts --no-progress
```

Installs PHP dependencies efficiently.

```yaml
- name: Cache Node modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('**/package.json') }}
    restore-keys: ${{ runner.os }}-node-modules-
```

Caches your frontend dependencies, just like Composer.

```yaml
- name: Install & build JS assets
  run: |
    npm ci --silent
    npm run build
```

Builds your frontend assets. Required for Filament (since it relies on Vite builds). If you're not using Filament or Inertia, remove this.

```yaml
- name: Copy test .env
  run: cp .env.example .env

- name: Generate application key
  run: php artisan key:generate --ansi
```

Prepares the Laravel app to boot and run tests.

```yaml
- name: Upload build & .env
  uses: actions/upload-artifact@v4
  with:
    name: build-env
    path: |
      public/build
      .env
```

Uploads the build output and environment config as an artifact. All test jobs will download this.

---

## Job 2: Run the Test Suite in Parallel (`tests-be`)

Here's where the test suite gets divided and executed in chunks.

```yaml
tests-be:
  name: Run unit tests (BE) — shard ${{ matrix.ci_node_index }}/6
  needs: prepare
  runs-on: ubuntu-latest
  container:
    image: lorisleiva/laravel-docker:8.3
```

We run the job 6 times in parallel, using a matrix strategy.

```yaml
strategy:
  fail-fast: true
  matrix:
    ci_node_index: [1, 2, 3, 4, 5, 6]
    ci_node_total: [6]
```

This creates 6 jobs, each with a unique `ci_node_index`. Every job knows it's one part of a total of 6. These values are passed into the splitter below.

```yaml
steps:
  - uses: actions/checkout@v4
```

Each job starts fresh—so we need to re-checkout the code.

```yaml
- name: Install GNU coreutils (for split -d)
  run: apk add --no-cache coreutils
```

We use coreutils' `split` and `paste` to process test file lists.

```yaml
- name: Disable Xdebug & OPCache for CLI
  run: |
    echo "xdebug.mode=off" > /usr/local/etc/php/conf.d/disable-xdebug.ini
    echo "opcache.enable_cli=0" >> /usr/local/etc/php/conf.d/disable-opcache.ini

- name: Increase PHP memory limit
  run: echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory.ini
```

Prevents out-of-memory errors when running heavy tests in parallel.

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

Restores PHP deps from cache, or installs them fresh if needed.

```yaml
- name: Download build & .env
  uses: actions/download-artifact@v4
  with:
    name: build-env
    path: .
```

Grabs the `.env` and frontend assets prepared earlier.

```yaml
- name: Copy .env
  run: cp .env.example .env

- name: Generate application key
  run: php artisan key:generate --ansi
```

Ensures Laravel is bootable in this test shard.

```yaml
- name: Ensure Paratest cache dir exists
  run: mkdir -p storage/framework/cache
```

Paratest (used under the hood by Pest) writes temporary cache here.

```yaml
- id: split
  uses: remarkablemark/find-and-split@v1
  with:
    directory: tests
    pattern: '*Test.php'
    chunk: ${{ matrix.ci_node_index }}/${{ matrix.ci_node_total }}
```

This plugin dynamically splits your test files into 6 equal groups and assigns each group to one job.

```yaml
- name: Run Pest (shard ${{ matrix.ci_node_index }})
  run: |
    FILES="${{ steps.split.outputs.files }}"
    PATTERNS=$(for f in $FILES; do basename "$f" .php; done | paste -sd '|' -)
    php -d memory_limit=-1 artisan test --filter "/($PATTERNS)/" --parallel \
      --cache-directory=storage/framework/cache --stop-on-failure
```

The script constructs a regex pattern from the assigned test files, passes it to Pest to run only matching tests, and runs them in parallel using all available cores.

---

## Job 3: Final Confirmation (`finish-tests`)

```yaml
finish-tests:
  name: Finish tests
  needs: tests-be
  runs-on: ubuntu-latest
  steps:
    - run: echo "All shards passed!"
```

This job runs only if all 6 shards completed successfully. It can be used to trigger deployments, notify Slack, or just log success.

---

## Final Thoughts

This workflow speeds up your test suite without adding infrastructure or complexity. The only external action is `find-and-split`, and it works with both Pest and PHPUnit.

Want to scale further? Run more than 6 shards for large test suites, add functional or browser tests to the matrix, or cache your SQLite test DB for even faster runs.

Once you've set this up, you'll never want to wait for 20-minute CI runs again.

---

## Why Separate Jobs?

The workflow uses **3 jobs** with a specific separation strategy for maximum efficiency:

**Job 1 (`prepare`)**: Builds the environment once - installs PHP dependencies, builds frontend assets, prepares `.env`, and uploads artifacts that all test jobs can reuse.

**Job 2 (`tests-be`)**: Downloads the pre-built artifacts and runs 6 times in parallel using a matrix strategy. Each instance runs a different shard of your test suite.

**Job 3 (`finish-tests`)**: Confirms all shards passed successfully.

**Why not combine them?** Without separation, each of the 6 test jobs would have to install Composer dependencies, install npm dependencies, build frontend assets, and set up the Laravel environment before running tests.

**With separation**, we build the environment **once** and all 6 test jobs reuse the same built environment—resulting in massive time savings by eliminating redundant building.

This "build once, test many times in parallel" pattern is the key to the performance gains.

---

## Complete Workflow File

Here's the complete `.github/workflows/tests.yml` file ready to copy and use:

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
    name: Run unit tests (BE) — shard ${{ matrix.ci_node_index }}/6
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

## Stay Tuned: Part 2 Coming Soon!

Running parallel jobs significantly speeds up your tests, but what happens when you exceed GitHub's free 2,000 minutes per month? The costs can add up quickly with standard GitHub-hosted runners.

In **Part 2** of this series, I'll show you how to run GitHub Actions for as little as **$4 per month** using cost-effective alternatives—even if you're running thousands of test minutes.

I'll cover self-hosted runners on budget cloud providers, spot instances and cost optimization strategies, when it makes sense to switch from GitHub-hosted runners, and real cost comparisons with break-even analysis.

Perfect for growing teams that need more CI/CD capacity without breaking the budget. Stay tuned!
