<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\MediaCollections\Models\Media; 
use Spatie\Image\Enums\Fit;

class SettingMedia extends Model implements HasMedia
{
use HasFactory, InteractsWithMedia;

    protected $fillable = ['key', 'value']; // Add any other relevant fields

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(config('settings.general.app_logo.collection'))
             ->singleFile(); // Optional: ensures only one file can be in this collection
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion(config('settings.general.app_logo.alias')) // You can name your conversion 'thumb', 'logo_150x40', etc.
            ->fit(Fit::Crop, config('settings.general.app_logo.width'), config('settings.general.app_logo.height')) // <--- Updated call 
            //->fit(config('settings.general.app_logo.width'), config('settings.general.app_logo.height')) // Resize to 150px width and 40px height
             ->nonQueued(); // For smaller images like logos, you might not need to queue it.
                             // Remove nonQueued() for larger images or if you have a queue worker.
    }
}
