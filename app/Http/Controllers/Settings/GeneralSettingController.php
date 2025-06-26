<?php

namespace App\Http\Controllers\Settings;

//use App\Abstracts\Http\Controller as BaseController;
use App\Http\Controllers\Controller as BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\GeneralSettingRequest;
use App\Models\SettingMedia;
use App\Settings\GeneralSettings;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Foundation\Http\FormRequest;
class GeneralSettingController extends BaseController
{
    public function construct() 
    {
        // Add CRUD permission check
        //$this->middleware('permission:read-settings-general')->only('edit');
        //$this->middleware('permission:update-settings-general')->only('update');
    }

    public function edit(GeneralSettings $settings) 
    {
        return $this->form($settings);
    }

    public function form(GeneralSettings $settings)
    {
        $appLogo = null;
        if ($settings->app_logo) {
            $settingMedia = SettingMedia::where('key','app_logo')->orderBy('id','DESC')->first();
            if ($settingMedia) {
                $appLogo = $settingMedia->getFirstMediaUrl(config('settings.general.app_logo.collection'),config('settings.general.app_logo.alias')); // 'logos' is your collection name
            }
        }

        return Inertia::render('Settings/General/Form',['settings' => $settings,'appLogo' => $appLogo]);
    }

    public function update(GeneralSettingRequest $request,GeneralSettings $settings)
    {
        $validated = $request->validated();

        try {
            $settings->app_name = $validated['app_name'];

            if ($request->hasFile('app_logo')) {
                //Log::debug("app_logo",json_encode( $request->all() ) );
                // Clear existing logo if any

                $settingMedia = new SettingMedia();
                $settingMedia->key = 'app_logo'; //
                $settingMedia->save();
                //$media = $settingMedia->addMedia($request->file('app_logo'))->toMediaCollection('logos');  
                //$media->save();
                $media = $settingMedia->addMediaFromRequest('app_logo')
                                 ->toMediaCollection(config('settings.general.app_logo.collection')); // 'logos' is a media collection
                //$media->save();
                $settingMedia->value = $media->id;
                $settingMedia->save();
                $settings->app_logo = $media->id;

                $settings->save();
            } else if($request->input('clear_app_logo')) {
                if ($settings->app_logo) {
                    $oldLogo = SettingMedia::where('key','app_logo')->first();
                    if ($oldLogo) {
                        $oldLogo->delete();
                    }
                }
                $settings->app_logo = "";
                $settings->save();
            }

            //$settings->save();

            $messageKey = 'data_is_updated';
            $name = trans_choice('general.general_settings',2);
            $message = __('general.' . $messageKey, ['name' => $name]);

        } catch (\Exception $e) {
            $message = $e->getMessage();
        }

        return redirect()->route('settings.general.edit')->with('success', $message);
    }
}