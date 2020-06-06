---
title: Maximizing laravel performance
image: /covers/database-performance-part1.png
permalink: laravel-performance
subtitle: By pushing more work to the database layer
date: 2020-06-05 14:25
description: Maximizing laravel eloquent performance by pushing more work to the
  database layer tips and tricks series
tags:
  - laravel
  - database
  - performance
---

In this blog series I'll discuss and share some cooliest techniques to make your Laravel application a hell lot faster and efficient.

Ideally while creating your application you should always be measuring your database's performance considering the following.

* How many queries are running.
* How long these queries are taking.
* How much data actually came from the database.

Before we get stated, we're gonna use a must-installed package called [laravel-debugbar](https://github.com/barryvdh/laravel-debugbar) to keep track of preformed queries and memory usage.

## Let's get started

Let's take a look at this simple example

```php
    public function index()
    {
        $users = User::query()
            ->with('company')
            ->simplePaginate();

        return view('users', ['users' => $users]);
    }
```

We've used eager loading to load company relation for all users

![Debug bar](/uploads/debugbar.png)

Ideally we want to aim for loading time less than **200 milliseconds** at most. The **query tap** is a great way of identifying n+1 problems, for example if we disabled eager loading the company relationship

```php
    public function index()
    {
        $users = User::query()
         //   ->with('company')
            ->simplePaginate();

        return view('users', ['users' => $users]);
    }
```

![Debug bar](/uploads/debugbar-disable-with.png)

Now we have gone from 2 database queries to 16 queries, and that makes sense, since laravel now have to load company one by one for each user. It's important that you catch this kind of type of problems in local development as they often become much worse in production.

Let's say we want order our users by name

```php
    public function index()
    {
        $users = User::query()
           ->with('company')
            ->orderBy('name')
            ->simplePaginate();

        return view('users', ['users' => $users]);
    }
```

![debug-bar](/uploads/debugbar-order-by.png)

Ordering a query can easily increase the combine query time and might be an indication that you need an index. So let's add that index via migration and see what will happen:

![debug-bar](/uploads/debugbar-add-index.png)

Even if you have one database query and that query runs slow, that's still a problem.

### Memory usage

What you may not realize is that your application memory usage is almost directly correlated to the performance, but the problem of using memory metric to measure database performance is it can be really hard to tell if something wrong. If your memory usage goes from 4mb to 6mb that's probably won't ring any alarm bells for you but something might be wrong.

That's why models tab is preferred

### Models Tap

The models metric keeps track of all the modals loaded from the database. It essentially provides the same kind of feedback as memory usage does except in a much understandable way.

![debug-bar](/uploads/debugbar-models.png)

let's see how this can be useful, add `$with` on Company model to load users anytime a company is loaded.

```php
   Class company extends Model
   {
       protected $with = ['users']
   }
```

![debug-bar](/uploads/debugbar-after-with.png)

Seems like adding `$with` property directly on the modal can create problems more than solves, if we look at memory usage it only gonna up to 6MB while if we look at models tap you can see the problem.

#### Keep in mind

* Ideally you should aim for the loading time to be less than 200 milliseconds.
* Keep track of the number of queries and watch out for n+1 problems.
* Query ordering can easily increase the combine query time and might be and indication that you need an index.

## Minimize memory usage by only selecting the column we actually needs

Laravel uses roughly **4 MB** of memory, if a query loaded the memory to **20 MB** that's indication of a problem.

Let's take a look at this example

```php
public function index()
{
    $posts = Post::query()
    ->with('author')
    ->latest('published_at')
    ->get()
}
```

I seeded the database with 20 users and 100 posts, but look at the memory usage tap thats a huge increase from **4 MB** laravel uses, and the reason why is that We tends to `select *` from the database which may includes large columns like in this example `body` colum, even we only needs only title and a date.

![debug-bar](/uploads/debug-memory-load.png)

If we look to the memory usage here this kinda concerning, so let's update out query to only select what we need.

```php
public function index()
{
    $posts = Post::query()
    ->select('id', 'title', 'created_at', 'published_at')
    ->with('author')
    ->latest('published_at')
    ->get()
}
```

![debug-bar](/uploads/debugbar-after-select.png)

And we back to our normal memory usage. You can also use the same technique with relationships `->with()` method allows you to select columns on the relationship by adding a by `->with('author:id,name,')`.

Now you might be wondering **should I go back to my entire application and apply this?** The answer is probably not, this technique tends to be more useful with the pages that interacts with a lot of database records like index pages, export functions. The trick is to keep an eye on your memory usage.

## How to get one record from has many relationships in most efficient way

Let's take a look at an example to help illustrate this. Imagine that you want to display user list with their last login as well, this simple request presents seemingly complex request.

One simple solution is run query to get the last login information for every user.

```php
    $users = User::query()
    ->get()

// in the blade view
$user->logins()->latest()->first()->created_at->diffForHumans();
```

 Which will create n+1 problem. Meaning if our page is displaying 50 users we're now executing 51 queries, while we only need 1 or 2 queries.

![debug-bar](/uploads/debugbar-loading-login.png)

Let's try to eager loading all the logins instead and do sorting on the collection.

```php
    $users = User::query()
    ->with('logins')
    ->get()

$user->logins->sortByDesc('created_at')->first()->created_at->diffForHumans();
```

![debug-bar](/uploads/debugbar-add-with-login.png)

As we can see we fixed our n+1 issue, but we end up loading over 7000 models from the database which consumes **14 MB** of memory however we introduced much bigger problem this will not only consume memory but also requires additional computational resources since each record must be initialized and hydrated as an eloquent model.

Quite often when we spot an n+1 problem we blindly reach for eager loading to solve the problem. However, in this problem eager loading relation is much worse solution than actually run those extra 15 queries.

Another solution might be to cache the last login on the users then when a user logs in we update it on the users table and from there we can just use the normal relationship.

```php
//migration file
$table->integer('last_login_at');
```

However, quite often caching can get ridiculously complicated fast.

## Sub queries

Sub queries allows us to add extra columns to our query that computed from another table. You can do that by adding `- ->addSelect()` method

```php
    $users = User::query()
    ->addSelect(['last_login_at' => Login::select('created_at')
        ->whereColumn('user_id', 'users.id')
        ->latest()
        ->take(1)
        ])
    ->with('logins')
    ->get()


// blade view, much simpler
$user->last_login_at
```

The reason we only take one record is that the sub query can only return column back.

![debug-bar](/uploads/debugbar-after-select-2.png)

We now down to only 15 models loaded from the database, and we're not loading any login models anymore and our memory usage reduced to just down **4 MB**. You also might be wondering have we might simply move our multiple query problem to the database layer?

The answer is **yes** and **no**. Yes database is technically still responsible for running all the queries, one query to get the user, and one sub query to get the last login for each user. However, databases is highly optimized for preforming tasks like this and from laravel perspective we're now running only one database query to get the data, that means one round trip from the web server to a database server.

### Laravel query time casting

**Extra tip** while using this technique when selecting a column you might want to cast it specially if it's a date laravel exposes `->withCasts(['last_login_at' => datetime])`.

## Dynamic relationships

What if we want to add additional information to our last login column for example showing the ip address for the last login. One option is we can create another scope for the `lastLoginIpAddress` and this will mostly work, but what if we want yet another column form the logins table? That's can quickly become tedious plus we could end up with a ton of scopes it would be much nicer if we could work directly with a login eloquent model.

Add `lastLogin` belongsTo relation on user model, for belongsTo relationship to work we need foreign key for the relationship which we don't have on the user table, but we can select it with a sub query.

```php
// will return login model
public function lastLogin()
{
    return $this->belongsTo(Login::class);
}

// select id column needed to load `lastLogin` relationship
// lastLogin relationship expects last_login_id
public function scopeWithLastLogin($query)
{
    $query->addSelect(['last_login_id' => Login::select('id')
        ->whereColumn('user_id', 'users.id')
        ->latest()
        ->take(1)
    ])->with('lastLogin');
}
```

When using this technique eloquent has no idea that `last_login_id` isn't a real column.

Let's update our controller

```php
$users = User::query()
->withLastLogin()
->paginate();

// blade view
$user->lastLogin->created_at->diffForHumans(); // created_at now is Carbon instance
$user->lastLogin->ip_address; // another column
```

Now let's take a look at the performance

![debug-bar](/uploads/debugbar-after-lastLogin.png)

We have our first query that gets users pagination count, and a second query for actually select users and this includes our sub query which gets `last_login_id`, and additional query to eager loads all selected `last_login_id` from the previous query.

![debug-bar](/uploads/debugbar-models-tap.png)

We only loads **15 users** records and **15 login** records which exactly what we see. How cool is that!

You might be wondering if we could have avoided all of these work by simply add hasOne relationship with an order, but that will reintroduce previous problems again and that makes sense, since laravel can't set a limit when eager loading relationships if we force limit on the hasOne relationship laravel will only get one last_login for the last user.

This Great tips inspired by [Jonathan Reinink's](https://reinink.ca/) [Eloquent patterns course](https://eloquent-course.reinink.ca/) it's a wonderful course, I learned a lot from it :)
