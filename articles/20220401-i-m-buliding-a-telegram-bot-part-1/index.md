---
title: I'm building a telegram bot to remind me changing my car oil part 1
image: /covers/telegram-bot-part1.png
description: Walkthrough my journey to create a telegram bot that will remind changing my car oil for me using nodejs.
permalink: oilly-telegram-bot
subtitle: "One less thing to remember"
date: 2022-04-02 16:00
series: oilly-telegram-bot
series-part: 1
tags:
  - telegram
  - nodejs
  - productivity
---

I hate to remember changing my car oil, too many minor things to remember in life already!
So I decided to build a simple Telegram bot that remembers changing the oil for me.

![Telegram bot cover](/uploads/telegram-bot-oil-cover.jpg)

**I wanted to share my thought process before actually coding it and gather my thoaughts. This just the first iteration.**

I'm planning this bot to be as simple as possible and free as possible, practically costing me $0 to maintain.
**Oilly** will be his name, with a headline that says:

> "Oilly will help you preserve your car engine by reminding you to change the oil, so you have one less thing to remember".

## Oilly will interact with the user ask them

- What is your Current mileage?
- Roughly estimate the last time the oil has been changed.
- The mileage in the last time oil changed.
- What is the type of the last changed oil 5k, 10k, 15k?
- How frequent they change the oil every 3 mo, 6 mo?
- Have they changed the oil filter in the last oil change?

Then the bot will respond with something like **"Thanks, based on the information you gave me I'll notify you!"**.

## How to calculate the oil change (research)

Based on my research I found that the maximum upper until chaning the oil is 10,000 KM or 6 months whichever comes first.

Some car manufacturers recommends depends on the environment:

- Every 6 months or 7500 KM.
- Every 3 months or 5000 KM (recommended).

## User input example (my real usage)

- Current mileage: **25,258**
- Last time changed oil: **2 months ago**
- Mileage last before change: **21,201**
- Oil type: **5k**
- Change oil frequency: **every 3 months**
- Have you changed the oil filter: **No**

## My Simple Thoaught Process

### State the facts

Calculate how long the user will take to reach 5k mileage:
**Ideal mileage usage 5k in 3 months.**

Current mileage - mileage last before change => 25,258 - 21,201 = 4,056 in 2 months.

**Avg mileage per day** => 4056 /60 = 67.6 KM

**Mileages left in distance unit** => 5000 - 4,056 = 944 KM

**Mileage left in time unit** => 1 months

**Change Oil filter last time**: NO, so this time change it.

### My approach

Based on the facts above, the easiest way to approach this is by:

- Send notification based on the time left until recommended period: after 1 month.
- Send notification based on avarage distance per day: Mileage left (944) / avg usage (67.6) = 14 days.

Maybe sending the user notification after 14 days asking the user if they reach **(26,202 KM)*** it's time to change, if the user says no, fall back to 1 month change.

**I'm trying to get some hold over this process, I would appreciate your take on this whole thing. 👇**
