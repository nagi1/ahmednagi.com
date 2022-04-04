---
title: I'm building a telegram bot to remind me changing my car oil part 3
image: /covers/telegram-bot-part3.png
description: Almost there on my journey to create a telegram bot that will remind changing my car oil for me using nodejs.
permalink: oilly-telegram-bot-part-3
subtitle: "Progress, progress, sweet progress"
date: 2022-04-02 16:00
series: oilly-telegram-bot
series-part: 3
tags:
  - telegram
  - nodejs
  - serires
  - productivity
---

Welcome to the part 3 of my journey to create a telegram bot that will remind me changing my car oil.

Checkout [part 1](https://ahmednagi.com/oilly-telegram-bot) and [part 2](https://ahmednagi.com/oilly-telegram-bot-part-2) for context.

## Today was productive AF

- [Today was productive AF](#today-was-productive-af)
- [Demo Preview](#demo-preview)
- [Ask Questions and record answers](#ask-questions-and-record-answers)
  - [Telegram persistance problem](#telegram-persistance-problem)
  - [Question Session](#question-session)
- [Database Structure](#database-structure)
  - [Users Table (Collection)](#users-table-collection)
  - [Questions answers Table (Collection)](#questions-answers-table-collection)
- [Project Structure](#project-structure)
- [Multiple Language support ❤ 🌎](#multiple-language-support--)
- [What next](#what-next)

## Demo Preview

I got the bot to ask questions and record answers. Here's a demo 👇!

![Demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fnmpmbzk334vsm3emxm1.gif)

Full demo can be found on Imugr 👉 [https://imgur.com/a/gPkI95A](https://imgur.com/a/gPkI95A);

## Ask Questions and record answers

Oilly now can ask questions like, "what is your current mileage?", and make sure to correctly record the answers in the database.

### Telegram persistance problem

Unfortunately telegram wont let you send any custom data with the message you have to debend on the text you send to record answers and here where I get stuck for 3 hours trying to find a way around.

Let me explain the problem in another way:

 When Oilly asks the user **What is the current mileage in (km) as shown in your car dashboard?** and waits for an answer there's no way for me to know wither the following text will be answer for this question or not because telegram doesn't return the message id in this case the question id, nor let you send custom data with the message.

```js
	bot.sendMessage(chat.id, "What is the current mileage in (km) as shown in your car dashboard?", {
		reply_markup: {
            // Options that doesn't contain custom data
		},
	});
```

1 cup of coffee and 21 Google results later I had this idea: [Question Session](#question-session) .

### Question Session

When Oilly asks the user a question it opens a session for that user with a question id and waits for an answers, then the user type the answer and tap done.

![Tap to Next question](/uploads/oilly-telegram-bot-part-3/tap-done-to-next-question.png)

![Question Session Table](/uploads/oilly-telegram-bot-part-3/question-session-answer.png)

## Database Structure

### Users Table (Collection)

Started with simple table that holds user information from the telegram [user object](https://core.telegram.org/bots/api/#user).

![Firebase users table](/uploads/oilly-telegram-bot-part-3/firebase-user-structure.png)

### Questions answers Table (Collection)

After every answer user have to tap **Done** to record the answer. A collection called `questions_answers` will get the latest answer from `question_sessions` collection and record answer in a document with a unique key `telegramChatId_question_id`

![Firebase questions answers table](/uploads/oilly-telegram-bot-part-3/questions-answers-table.png)

## Project Structure

![Project Structure](/uploads/oilly-telegram-bot-part-3/folder-structure.png)

I made some changes to the project structure like extracting every question logic into it's own file on `questions` folder.

That helped me organinsing the code even more here's an example from the `current-mileage.js` question file.

```js
const askCurrentMileage = async (/** @type {TelegramBot.Chat}*/ chat) => {
	bot.sendMessage(chat.id, lang.__('current_mileage_question'), {
		reply_markup: {
			force_reply: true,
			selective: true,
			input_field_placeholder: '25000',
		},
	});

	// open question session
	const questionSessionData = {
		id: 1,
		question: 'current_mileage_question',
		answer: null,
		created_at: serverTimestamp(),
	};

	await setDoc(doc(db, 'question_sessions', String(chat.id).toString()), { ...questionSessionData, created_at: serverTimestamp() });

	bot.sendMessage(chat.id, lang.__('enter_correct_then_done'), {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: lang.__('Done'),
						callback_data: JSON.stringify({
							type: 'done_answer',
							value: 1,
						}),
					},
				],
			],
		},
	});
};

const validationLogicForCurrentMileage = (answer) => {
	return isNumber(answer) && answer > 0;
};

```

## Multiple Language support ❤ 🌎

I believe that everyone no matter what lanague they speak deserve a chance to experience software at their native language.

Added language support using `i18n` [npm package](https://www.npmjs.com/package/i18n) **and I intend to opensource this bot so other people can contribute to translating it!**

## What next

- Implement the calculation algorithm.
- Implement the cronjobs logic.
- Deploy to vercel.
- Test
- Opensouce

**To be continue...**
