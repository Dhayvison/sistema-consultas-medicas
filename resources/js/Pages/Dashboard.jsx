import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import AppointmentStatusIndicator from "./Appointment/Components/AppointmentStatusIndicator";

export default function Dashboard({ auth, appointments }) {
    console.log(appointments);
    const [registeringPatient, setRegisteringPatient] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        age: "",
    });

    const closeModal = () => {
        setRegisteringPatient(false);
        reset();
    };

    const storePatient = (e) => {
        e.preventDefault();

        post(route("patient.store"), {
            preserveScroll: true,
            onSuccess: (response) => {
                closeModal();
            },
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

                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Histórico de consultas
                </h2>
                <div className="mt-4 pb-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <table className="table-auto w-full border-collapse  text-gray-800 dark:text-gray-200">
                        <thead>
                            <tr className="bg-white dark:bg-gray-800">
                                <th className="px-4 py-2">Paciente</th>
                                <th className="px-4 py-2">Situação</th>
                                <th className="px-4 py-2">Data</th>
                                <th className="px-4 py-2">Exames</th>
                                <th className="px-4 py-2">
                                    Tempo de atendimento
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.data.map((appointment) => {
                                const exams = appointment.exams
                                    .map(({ name }) => name)
                                    .join(", ");
                                return (
                                    <tr key={appointment.id}>
                                        <td className="border-t px-4 py-2">
                                            {appointment.patient.name}
                                        </td>
                                        <td className="border-t px-4 py-2">
                                            <AppointmentStatusIndicator
                                                statusText={appointment.status}
                                            />
                                        </td>
                                        <td className="border-t px-4 py-2">
                                            {new Date(
                                                appointment.startedAt
                                            ).toLocaleString()}
                                        </td>
                                        <td className="border-t px-4 py-2">
                                            {exams}
                                        </td>
                                        <td className="border-t px-4 py-2">
                                            {appointment.spended}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
