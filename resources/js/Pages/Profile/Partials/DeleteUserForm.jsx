import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
//import Modal from '@/Components/Modal';
import { Modal } from "@/Components/UI/Modal";
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Label from "@/Components/Form/Label";
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { t, tChoice, currentLocale, setLocale, getLocales, isLocale } = useLaravelReactI18n();
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    {t('general.delete_account')}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {t('message.warning_account_delete')}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {t('general.delete_account')}
            </DangerButton>

            <Modal isOpen={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">
                        {t('message.confirm.delete_account')}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        {t('message.warning_account_delete')}
                    </p>

                    <div className="mt-6">
                        {/*<InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />*/}
                        <Label htmlFor="firstName">{t('general.password')}</Label>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
