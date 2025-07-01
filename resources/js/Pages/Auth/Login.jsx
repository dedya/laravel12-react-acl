//import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PageMeta from "../../Components/Common/PageMeta";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../utils/icons";
import Label from "../../Components/Form/Label";
import Input from "../../Components/Form/Input/InputField";
import Checkbox from "@/Components/Form/input/Checkbox";
import Button from "../../Components/UI/Button/Button";
import { useState } from "react";
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Login({ status, canResetPassword }) {
    const { t, tChoice } = useLaravelReactI18n();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
    //const { general, message } = usePage().props;

    return (
        <>
            <PageMeta
                title={t('general.sign_in')}
                description={t('general.sign_in')}
            />
            {/*<GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}*/}

            <div className="flex flex-col flex-1">
                <div className="w-full max-w-md pt-10 mx-auto">
                    {/*<Link
                        href={route('tailadmin.dashboard')}
                        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <ChevronLeftIcon className="size-5" />
                        {message?.back_to_dashboard}
                    </Link>*/}
                </div>

                <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                    <div>                       
                        <div>                         
                            <form onSubmit={submit}>
                                <div className="space-y-6">
                                    <div>
                                        <Label>
                                            {t('general.email')} <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            placeholder="info@gmail.com"
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label>
                                            {t('general.password')} <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}

                                            />

                                            <InputError message={errors.password} className="mt-2" />

                                            <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                            >
                                                {showPassword ? (
                                                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                                ) : (
                                                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                                            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                                                {t('general.keep_me_logged_in')}
                                            </span>
                                        </div>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                            >
                                                {t('general.forgot_password')}
                                            </Link>
                                        )}
                                    </div>
                                    <div>
                                        <Button className="w-full" size="sm" disabled={processing}>
                                            {t('general.sign_in')}
                                        </Button>
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

{/*
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
            {/*</GuestLayout>*/}
        </>
    );
}
