---
title: Filament Select All Action
image: /covers/filament-select-actions-code.png
description: How to add select all and deselect all actions to Filament's Select Form input.
permalink: snippets/filament-select-all-action
layout: Snippet
date: 2024-11-19 16:00
tags:
  - snippet
  - filament
  - laravel
---

![Demo](/uploads/filament-select-actions.gif)

```php
// in register method - AppServiceProvider.php
 \Filament\Forms\Components\Select::macro('selectAllHintActions', function () {
            /** @var Filament\Forms\Components\Select $this */
            return $this->hintActions([
                \Filament\Forms\Components\Actions\Action::make('select_all')
                    ->label(__('Select All'))
                    ->action(fn (Select $component) => $component->state(
                        array_keys($component->getOptions())
                    )),
                \Filament\Forms\Components\Actions\Action::make('deselect_all')
                    ->label(__('Deselect All'))
                    ->action(
                        fn (\Filament\Forms\Set $set, Select $component) => $set($component->getName(), []),
                    ),
            ]);
        });

// in your resource/form/page...

return [
    Select::make('supplier_type_ids')
                ->label(__('Suppler Type'))
                ->searchable()
                ->preload()
                ->multiple()
                ->live()
                ->options(function () {
                    return SupplierType::query()->pluck('name', 'id');
                })
                ->selectAllHintActions() 🌟🌟🌟🌟🌟🌟🌟🌟
                ->required(),
];
```
