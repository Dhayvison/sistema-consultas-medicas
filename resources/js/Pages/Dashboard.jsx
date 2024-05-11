import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Dashboard({ auth }) {
    const [registeringPatient, setRegisteringPatient] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        age: null,
    });

    const closeModal = () => {
        setRegisteringPatient(false);
        reset();
    };

    const storePatient = (e) => {
        e.preventDefault();

        post(route("patient.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const registerPatient = () => {
        setRegisteringPatient(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Página inicial
                </h2>
            }
        >
            <Head title="Página inicial" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <section className="my-4">
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton onClick={registerPatient}>
                            Iniciar consulta
                        </PrimaryButton>
                    </div>

                    <Modal show={registeringPatient} onClose={closeModal}>
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Iniciar consulta
                            </h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Registre o nome e a idade do seu paciente para
                                prosseguir com o registro de consulta
                            </p>

                            <form onSubmit={storePatient}>
                                <div className="mt-6">
                                    <InputLabel htmlFor="name" value="Nome" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        isFocused
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-6">
                                    <InputLabel htmlFor="name" value="Idade" />

                                    <TextInput
                                        id="age"
                                        type="number"
                                        name="age"
                                        className="mt-1 block w-full"
                                        value={data.age}
                                        onChange={(e) =>
                                            setData("age", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.age}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <SecondaryButton onClick={closeModal}>
                                        Cancelar
                                    </SecondaryButton>

                                    <PrimaryButton
                                        className="ms-3"
                                        disabled={processing}
                                    >
                                        Registrar paciente
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </section>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Você está logado!
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
