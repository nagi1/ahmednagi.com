---
title: "Visualize your progress improve your results"
image: /covers/hill-chart-cover.png
permalink: hill-chart
subtitle: "Using hill charts"
date: 2020-04-18 22:20
description: How to visualize your progress in a project and how it might help you see the bigger picture.
tags:
  - hill-chart
  - todo
  - data

---

I don't know about you, but I manage to drown myself in shit ton of todo lists every time I start new project, sometimes I get lost. okay ... okay, that's was a lie, I always get lost and lose track of which is important and should be done first, and wasting time arguing on twitter about how to write if statements.

![Hill Charts](/uploads/full-list.jpg)

If you're anything like me you need to take step back and look at the bigger picture, that picture that express **1000 words**, which exactly what I found in...[Hill Charts](https://basecamp.com/features/hill-charts).

![Hill Charts](/covers/hill-charts.gif)

### Compact

Everything you need to know about a task, name or description, importance and how deep are you in trouble (completeness).
A bigger picture answers two important questions.

- Is the project going to be done on time?
- Am I stuck?

![Hill Chart](/uploads/hill-charts-mine.png)

### Uncertainty simplified

In early stages of working on a task you'll climb the hill where you figure out your approach. You have basic idea about the task, but you haven’t figured out what the solution is going to look like or how to solve all the unknowns.

Eventually you reach a point where there aren’t any more unsolved problems. That’s like standing at the top of the hill. You can see clearly all the way down the other side. Then to the fun part, down-hill phase is just about execution.

![Hill Chart](/uploads/hill-chart-uncertainty.svg)

### More information than you think

We humans are visual creatures, we can extract more information from visual elements more than verbal or written ones for example if you spot one dot on the chart that isn't moving for some period of time that gives you hints that you might want to re-think execution or divide the task into smaller parts.

What I like even more about hill charts is that the status is human generated, not computer generated. This reflects a real person’s feeling of the work at this moment.

![Hill Chart](/uploads/dot-not-moving.png)

### Start small grow large

Most of us specially developers tends to get a head of themselves and think about final results and what the finished product will look like. Hill charts are designed to visualize task lists not individual tasks, so we can divide large tasks into individual, smaller, and focusable tasks.
By focusing more on a single task we maximize and optimize the time devoted for it, creating what's called **Snowball effect**.

Climbing the hill in the first half is hard and time consuming, once we reaches the top of the hill we'll start to form better ideas and execution plans to complete the task which gets us down the hill  even faster.

![Hill Chart](/uploads/snowball-effiect.gif)

### Better prospective

Hill charts changed my way of thinking about progress at a level never before possible. Now I have a way to immediately see where things stand. It’s no longer a challenge to see what’s in motion and what’s stuck and need more work.

## Implementation

![Hill Chart meme](/uploads/hill-climb-racing.png)

I love this game BTW, but I'll choose another way to implement hill charts using [D3.js](https://d3js.org/) a javascript data visualization library.

Since we'll deal with charts and math Let's start by this "simple" equation.

```js
const hillFn = (point) =>
  50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50;
```

Woh! that's looks complicated I know, this function is responsible for produce hill-like curve and, correctly position and drag points on the curve.

use [Desmos](https://www.desmos.com/) to visualize the curve.

![curve](/uploads/hillfn-graph.png)

Now we have ourselves a meteor hole not a hill but we'll fix that.

```js
    // Set X and Y axis scale values, it used to determine the center of the chart
    // when calling this.xScale(50), it also flip the y axis to start from the
    // lowest point and scale up like claiming a hill from the ground.
    this.xScale = scaleLinear().domain([0, 100]).range([0, this.chartWidth]);
    this.yScale = scaleLinear().domain([0, 100]).range([this.chartHeight, 0]);
```

`this.chartWidth` could be any width.

One of the most powerful features in d3js is `scaleLinear` domains. In this implementation d3 will represent ranges from **0** to **chart width** in domain (scale) from **0** to **100** where **0** is the beginning of the chart and **100** is the end and **50** is the hightest point, no matter the width or the hight of the chart.

in the second line we flipped the range so that the y axis to start from the lowest point and scale up like claiming a hill from the ground. it's like adding **minus sign** before the equation.

```js
const hillFn = (point) =>
  -1 * (50 * Math.sin((Math.PI / 50) * point - (1 / 2) * Math.PI) + 50);
```

![equation chart](/uploads/equation-chart.png)

### Normalizing points

Because every point on the hill chart can be represented as value from **0** to **100** on the X axis, end-user may enter a point x coordinates on the chart and the `hillfn` will take care of converting it to actual **(x, y)** pair on the chart.

```js
// Example of point
  {
    id: '3' // (optional)
    color: 'red',
    description: 'Late af task',
    size: 10,
    x: 45,
    link: '/fired.html',
  }
```

### Points can climb hills

While implementing dragging points, I faced problem of converting new coordinates **(x, y)** pair to scale values from **0** to **100**.

**x** axis value on the chart which represented by `data.x` is taking the mouse **x** axis event value, while it **can't** move freely on **y** axis according to the mouse coordinates, so in order to get **y** axis value we need to get the invert of scale x value and pass it to `hillfn` which will get the scale **y**. For example

![point-hill-chart](/upload/mouse-move-on-chart.png)

In this example **x** coordinate of the mouse **equals** the yellow point **x** coordinate on the chart, to get **y** `yScale(hillFn(invertedX))`

```js
      // Convert current point coordinates back to the original scale
      // between 0 and 100 to set it in the data attribute
      const invertedX = that.xScale.invert(x);

      // move point on x axis
      data.x = x;

      // Explained above
      data.y = that.yScale(hillFn(invertedX));
```

After climbing that hill (dragging), a user may want to know new point coordantes that's when I faced another problem of converting y point to scale Y point so user can save it to database.

I had to find the reverse of `hillfn`

```js
// The inverse of hillfn() convert values from chart coordinates
// back to the original scale hillFn() value. mainly used
// in dragging event and setting the setting new values.
const hillFnInverse = (point) =>
  (25 * (2 * Math.asin((point - 50) / 50) + Math.PI)) / Math.PI;
```

Now we can convert point coordinates on chart to scale pair

```js
      const invertedY = hillFnInverse(that.yScale.invert(data.y));

      const newInvertedCoordinates = {
        x: invertedX,
        y: invertedY,
      };
```
