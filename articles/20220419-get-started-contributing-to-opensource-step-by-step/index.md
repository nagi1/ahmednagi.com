---
title: Getting started with contributing to open source – Real world example
image: /covers/getting-started-with-opensource.png
description: Actionable step by step guide on how to contribute to opensource project using real-world example
permalink: getting-started-with-opensource
subtitle: "Actionable step by step guide on real world package"
date: 2022-04-20 16:00
tags:
  - opensource
  - guide
---

This is your step-by-step detailed with images guide on getting started contributing to opensource using real world package on github.

## Roadmap

[[toc]]

## How to find something to contribute on

Community make it super easy to get started with opensource you can even start by fix typos on `Readme` files in any repo.

### When you're a complete beginner

Although I encourage you to get involved in opensource community as soon as possible, I recommend starting a project with your favorite tech stack or language.

Get better understanding of what is going on inside these projects first before contributing.

👉 Visit [good first issue](https://goodfirstissue.dev/) and pic your favorite **language or framework**.

![Good first issue](/uploads/getting-started-with-opensource/goodfirstissue.png)

👉 Click on the project you like.

👉 Open `Issues` tap on the project's github page.

👉 In the search field enter this phrase `is:issue is:open #good label:"good first issue"`.

![Github issue](/uploads/getting-started-with-opensource/githubissue.png)

### When you have some experience

After working with a package or language for sometime you'll start to notice that these projects are missing some features you may need to implement yourself.

<Tip body="<b>Tip:</b> I keep a list of the projects that I may contribute to in the future 👇" />

![My contributions todo list](/uploads/getting-started-with-opensource/todo.png)

<span class="text-xl">👨‍💻 In my case I was using a **PHP Laravel package** called `laravel-carbon-macros` which provides a convince methods to check holidays in many countries **except my country Egypt**. So let's start contributing...</span>

But before we jump in let's answer this question that you might have...only:

## Why the hell I'm working for other people for free?

  **Long answer short:** you're not! You're just giving back to the community.

  **Plus** your opensource contributions is like your **CV on steroids**, you are 80% more likely to get job when you have a history (portfolio) of opensource contributions.

## Getting started

After choosing the package/repo you like, it's time to `fork` it 👇

![fork](/uploads/getting-started-with-opensource/fork.png)

> **Forking** is like copy and paste the repo code to your github repository.

### 1- Copy repo link

![1](/uploads/getting-started-with-opensource/1.png)

### 2- Open your vscode or your terminal

- Type this command to clone the repository

```bash
git clone https://github.com/nagi1/laravel-carbon-macros.git
```

- Replace `nagi1` with your own github username and `laravel-carbon-macros` with package name

- You should see folder structure 👇

![2](/uploads/getting-started-with-opensource/2.png)

### 3- Get familiar with contribution guide

**Get your PRs accepted by follwing the rules**. Most of opensource repositories have some sort of `CONTRIBUTING.md` guide on the root repository folder or inside `.github` folder.

Make sure to read this guide first as it contains import information about how to get started and the coding rules you have to follow to have your PR accepted.

![contributing.md](/uploads/getting-started-with-opensource/contributing-file.png)

<Tip body="<b>Bonus:</b> Open Pull Requests tap and take quick look on how other people submit their PR or structure their code."/>

## Pull in dependencies

Since this is a php laravel package it uses `compoesr` so let's pull the package dependencies using composer

```bash
composer install
```

<Tip body="<b>Note</b> that if this were a javascript package it'll use yarn or npm." />

## Navigating around source code

<DangerBox body="<b>Note:</b> The following example is php laravel specific code, but don't worry if you didn't fully grasp it. It's just for demonstration." />

**The Task:** We want to add `Egyptian holidays` to this package.

Navigate to `Src` usually most of the source code lives in it.

![src](/uploads/getting-started-with-opensource/src-folder.png)

### Follow convention

![Follow convention](/uploads/getting-started-with-opensource/dates.png)

You can see in the image above ☝ that other developer from other countries name file using simple formula `CountryNameHolidays.php`, and that exactly what we will gonna do.

## Let's start coding this

Let's open a random file `CanadianDates.php` and take a look on the code

![3](/uploads/getting-started-with-opensource/3.png)

### Create new file follwing convention

I copied `CanadianDates.php` to `EgyptianHolidays.php`

![4](/uploads/getting-started-with-opensource/4.png)

### Add your contribution

I start adding **Egyptian holidays** 👇 and added guidance/reference comments for other developers that may read this in the future.

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

Open of the biggest reasons why so many PR get closed on github it because developer don't test their code and expect the maintainer to add test.

Bad news open source maintainers doesn't have time and prefere to close the PR than spend 30 min adding tests to your code.

I added tests and run phpunit to make sure that my code works!

![8](/uploads/getting-started-with-opensource/8.png)

## Commet complete related work

After completing a chunk of work that relates to each other, in this case was adding the dates and add tests I commted with a pretty message 👇

![commit](/uploads/getting-started-with-opensource/commit.png)

## Tell other people how to use your code - add docs

It would be nice of you to include some documentation for the maintainer and other developer on how to use the feature you just add.

Most of open source repositories include documentation in the `readme.md` file or in a detected folder `docs`.

![docs](/uploads/getting-started-with-opensource/docs-folder-struc.png)

I opened `docs` and found that every country have it's own file, so I copied one file and renamed to `egypt.md`.

### Put your touch

I tried to open one of the other countries docs file to get a better feel of how other maintainers structure their docs

![docs](/uploads/getting-started-with-opensource/other-docs-example.png)

Clearly not the best docs ever 😂

I can't help myself be productive so here's what I have done 👇

![docs after](/uploads/getting-started-with-opensource/11-docs.png)

### Go the extra mile

Take a look at this readme file 👇

![Readme](/uploads/getting-started-with-opensource/readme.png)

You'll notice that every country have small 2 letters next to it, I didn't want to break this convention so I serached google and it turns out that it's a emoji for country flag. I searched for egypt and it showed 👇

![faraway](/uploads/getting-started-with-opensource/faraway.png)

## Run full test suite

Run the full test suite to make sure that nothing broke else where in the codebase.

![Final test](/uploads/getting-started-with-opensource/Final-test.png)

## Commet and submit a PR

After you finish implementing your feature and write docs commit your work.

Now It's time to submit a `PR`:

- Navigate to your forked repo, not the original repo and click `Open pull request` button. 👇

![Contribute](/uploads/getting-started-with-opensource/contribute.png)

![Contribute-2](/uploads/getting-started-with-opensource/contri-2.png)

### Type clear title, describe exactly what you did

![Contribute-3](/uploads/getting-started-with-opensource/contrib-3.png)

## Wait for your PR to get accepted or rejected

After submitting your work you have to wait a little bit for the container to accept or reject the **PR** based on their rules or availability.

![Contribute-4](/uploads/getting-started-with-opensource/contrib-4.png)

<Tip body="Now be nice, stay clam and wait for the maintainer to accept the PR don't spam the issues. Everyone have a life and busy schedule." />

![Late PR](/uploads/getting-started-with-opensource/late-pr.png)

## Conclusion

This isn't the ending, this is just the beggining of your open source journey. I hope that I helped you elemnate some of the fear you have towards contributing and sharing your awesome code with the world.

If you enjoyed reading this leave me a comment bellow 👇 or reach out on twitter [@nagiworks](https://twitter.com/nagiworks) and say hi :)
