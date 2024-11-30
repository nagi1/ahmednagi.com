---
title: "Add Custom Topbar to Filament"
image: /covers/add-custom-topbar-to-filament.png
permalink: /add-custom-topbar-to-filament
subtitle: "Add a custom livewire component to Filament's topbar that fetches data from the database"
date: 2024-11-30 16:00
description: In this snippet, we tried to add a custom topbar with a content and make it pretty with TailwindCSS.
tags:
  - filament
  - laravel
  - snippet
---

In this snippet, I'll share with you how I added a custom livewire component to Filament's topbar, it's pretty simple and can add a lot of value to your application.

In this example, I needed to add links to the topbar to navigate favorite pages/resources.

Here's a quick look at the final result:

![Custom Topbar](/uploads/demo-custom-topbar.png)

## Step 1: Create a Livewire Component

First, let's create a new Livewire component that will be responsible for rendering the custom topbar.

```bash
php artisan make:livewire Topbar/FavoriteResources
```

This command will create a new Livewire component in the `app/Http/Livewire/Topbar` directory.

Since we need to render the custom topbar in the topbar, we need to hook into `PanelsRenderHook::TOPBAR_START` render hook.

## Step 2: Hook into Filament's Topbar Render Hook

In the panel provider `AdminPanelProvider.php`, or `AppPanelProvider.php` if you're using a custom panel provider, add the following code:

```php
    use Filament\Panel;
    use Filament\View\PanelsRenderHook;

    public function panel(Panel $panel): Panel
    {
        return $panel->renderHook(name: PanelsRenderHook::TOPBAR_START, hook: fn (): string => Blade::render('@livewire(\'topbar.favorite-resources\')'));
    }
```

`Blade::render('@livewire(\'topbar.favorite-resources\')')` will render the Livewire component in the topbar.


## Step 3: Add the Livewire Component to the Topbar

In the Livewire component `app/Http/Livewire/Topbar/FavoriteResources.php`, add the following code:


```php
class FavoriteResources extends Component
{
    public array $favorites;

    public function mount()
    {
        /**
         * @var User
         */
        $user = Auth::user();

        // We are using cache to get the favorite resources because this component will be rendered on every page load
        $this->favorites = collect(
            Cache::get(sprintf(FavoriteResource::$cacheKey, $user->id),
                $user->favoriteResources()->get()->toArray())
        )
            ->transform(function (array $favorite) {
                // Favorite['name'] is the name of the resource we need to get the class from the container
                $class = app($favorite['name']);
                $name = $class instanceof Resource ? $class::getTitleCaseModelLabel() : $class->getTitle();
                $icon = $class::getNavigationIcon();

                return [
                    'name' => $name,
                    'url' => $class::getUrl(),
                    'icon' => $icon,
                ];
            })
            ->toArray();
    }

    public function render()
    {
        return view('livewire.topbar.favorite-resources');
    }
}
```

Regrading this line of code:

```php
$name = $class instanceof Resource ? $class::getTitleCaseModelLabel() : $class->getTitle();
```

This line will handle the case if the user favorite a resource class or a custom page.

in the `resources/views/livewire/topbar/favorite-resources.blade.php` file, add the following code:

```html
    <div class="items-center hidden gap-x-3 lg:flex">
        @if (count($favorites) > 0)
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-100">
                {{ __('Quick Links') }}
            </span>

            <div class="flex items-center gap-x-5">
                @foreach ($favorites as $favorite)
                    <x-filament::icon-button tag="a" size="xl" :tooltip="$favorite['name']" :icon="$favorite['icon']" :href="$favorite['url']"></x-filament::icon-button>
                @endforeach
            </div>
        @endif
    </div>
```

`FavoriteResource` is a model that stores the favorite resources for the user, you can create a migration for it like this:

```bash
php artisan make:model FavoriteResource -m
```

and in the migration file, add the following code:

```php
    public function up()
    {
        Schema::create('favorite_resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->timestamps();
        });
    }
```

and in the `FavoriteResource` model, add the following code:

```php
    public static string $cacheKey = 'favorite-resources:%s';

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
```

## Step 4: Add the Favorite Button to the Resource

I liked to add a favorite button to the resource page, so the user can easily favorite the resource.

![Favorite Button](/uploads/filament-favorite-button.png)

```php
  \App\Actions\FilamentActions\FavoriteResourceAction::make()->className(static::$resource),
```

This is a custom action that will be added to the resource page or any custom page you want to add the favorite button to.

This a simple implementation to just demonstrate the idea, you can make it more complex and add more features to it.

```php
namespace App\Actions\FilamentActions;

use App\Models\FavoriteResource;
use App\Models\User;
use Filament\Actions\Action;

class FavoriteResourceAction extends Action
{
    protected string $class;

    public static function getDefaultName(): ?string
    {
        return 'favorite_resource';
    }

    public function className(string $class): static
    {
        $this->class = $class;

        return $this;
    }

    public function getClassName(): string
    {
        return $this->class;
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->hiddenLabel()
            ->tooltip(__('Toggle this screen as a favorite to access it quickly from the topbar.'))
            ->outlined()
            ->color('warning')
            ->icon(fn () => FavoriteResource::isFavorite($this->getClassName()) ? 'heroicon-s-star' : 'heroicon-o-star')
            ->action(function (Action $action, $livewire) {
               FavoriteResource::toggleFavorite($this->getClassName());

                // add notification

                // refresh the page to update the favorite button
                $livewire->js('window.location.reload()');
            });
    }
}
```

This action will toggle the favorite status of the resource, and refresh the page to update the favorite button.

Stay tuned for more Filament snippets and tutorials.
