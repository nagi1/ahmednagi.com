---
title: dump sql without question (?) mark laravel
image: /covers/dump-sql.png
description: How to dump SQL queries without ? mark using laravel eloquent
permalink: snippets/laravel-dump-sql
layout: Snippet
date: 2022-04-15 16:00
tags:
  - snippet
  - eloquent
  - laravel
---

![Link Preview](/covers/dump-sql.png)

![dump sql without question (?) mark laravel](/uploads/dump-sql-snippet.png)


In `In AppServiceProvider.php`

```php
Builder::macro('ddb', function () {
      $bindings = array_map(
          fn ($value) => is_numeric($value) ? $value : "'{$value}'",
          $this->getBindings()
      );

      return Str::replaceArray('?', $bindings, $this->toSql());
  });
```
