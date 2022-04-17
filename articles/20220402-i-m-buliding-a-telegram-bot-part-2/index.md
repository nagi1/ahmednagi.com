---
title: I'm building a telegram bot to remind me changing my car oil part 2
image: /covers/telegram-bot-part2.png
description: Continuing my journey to create a telegram bot that will remind changing my car oil for me using nodejs.
permalink: oilly-telegram-bot-part-2
subtitle: "One less thing to remember powered by Vercel and Firebase"
date: 2022-04-02 16:00
series: oilly-telegram-bot
series-part: 2
tags:
  - telegram
  - nodejs
  - productivity
---

Part 2 of my journey to create a telegram bot that will remind changing my car oil for me.

## Today was productive

- [I were able to produce some basic output](#basic-output).
- [Figured out the stack I'm going to use](#development-stack-and-tools)
- [Figured out the 2 operating modes for the bot](#operating-modes)

## Basic output

![Telegram bot basic output](/uploads/telegram-bot-basic-output.png)

## Development Stack and tools

I decided to use **nodejs** for the backend, since it is the easiest to get started with.
For the database I decided to go with **Firebase** for the generous free tire and realtimeness.

For working with the telegram bot API I used NPM package: [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) as the wrapper to work with the telegram bot api.

I wanted to use [Vercel](https://vercel.com/) for development but it kinda sucks with debuging so I used [ngrok](https://ngrok.com/) to tunnel requests to my local node server.

Didn't want to use frameworks or complicated file structure I stucked with the simplest working structure 👇

![Oill folder structure](/uploads/oilly-telegram-folder-structure.png)

Spent most of the day lurking around telegram bot API, understanding how to send simple messages and get responses.

<UrlPreview url="https://core.telegram.org/bots/api/" />

**Firebase** will store the state like only display welcome message once to the users.

**EasyCron** will hit the server every 3 hours to calculate and notify users based on the [formula explained in the part 1](https://ahmednagi.com/oilly-telegram-bot)

## Operating modes

You may already noticed the 2 options shown in the [basic output](#basic-output) image.

![Basic output cropped](/uploads/telegram-bot-basic-output-cropped.png)

- **Remind me in x monthes** For the people who just want Oilly to remind them in a specific time.
- **Based me based on my algorithm** This where all the magic is happening more on this in [part3](https://ahmednagi.com/oilly-telegram-bot-part-3).

I'm starting to see pieces falling into their places, It's been only a one day and I could tell that I'm at 50% mark.

I'll keep posting about the details of this light piece of software.

**To be continued, Follow for more...**
