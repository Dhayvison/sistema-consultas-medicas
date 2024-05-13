import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import AppointmentStatusIndicator from "./Components/AppointmentStatusIndicator";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import Select from "@/Components/Select";
import { useState } from "react";
import InputError from "@/Components/InputError";

export default function Edit({ auth, appointment, canEditStatus, exams }) {
    const { post, processing } = useForm();
    const [selectedExam, setSelectedExam] = useState("");
    const [showExamError, setShowExamError] = useState(false);

    const cancelAppointment = () => {
        post(route("appointment.cancel", { id: appointment.data.id }));
    };

    const endAppointment = () => {
        post(route("appointment.end", { id: appointment.data.id }));
    };

    const addExam = (e) => {
        e.preventDefault();

        setShowExamError(false);
        post(
            route("appointment.exam.store", {
                appointmentId: appointment.data.id,
                examId: selectedExam,
            }),
            {
                preserveScroll: true,
                onError: () => {
                    setShowExamError(true);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Consulta
                </h2>
            }
        >
            <Head title="Consulta" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8  shadow sm:rounded-lg bg-white dark:bg-gray-800">
                        <section className="flex items-center justify-between flex-col-reverse gap-2 sm:flex-row">
                            <AppointmentStatusIndicator
                                statusText={appointment.data.status}
                            />

                            {appointment.data.spended && (
                                <div className="text-xs font-medium text-black dark:text-gray-200">
                                    Tempo de atendimento:{" "}
                                    {appointment.data.spended}
                                </div>
                            )}

                            <div className="text-xs font-medium text-black dark:text-gray-200">
                                {new Date(
                                    appointment.data.startedAt
                                ).toLocaleString()}
                            </div>
                        </section>

                        <section className="font-semibold mt-8 text-gray-800 dark:text-gray-400">
                            Dados do Paciente
                            <div className="text-black dark:text-gray-200">
                                <div className="text-2xl">
                                    {appointment.data.patient.name}
                                </div>
                                <div>{appointment.data.patient.age} anos</div>
                            </div>
                        </section>

                        {canEditStatus && (
                            <section className="flex mt-8 justify-end gap-2 sm:mt-0">
                                <DangerButton
                                    disabled={processing}
                                    onClick={() => cancelAppointment()}
                                >
                                    Cancelar consulta
                                </DangerButton>
                                <PrimaryButton
                                    disabled={processing}
                                    onClick={() => endAppointment()}
                                >
                                    Finalizar consulta
                                </PrimaryButton>
                            </section>
                        )}
                    </div>
                    <div className="mt-6 max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 sm:p-8  shadow sm:rounded-lg bg-white dark:bg-gray-800">
                            <span className="font-semibold mt-8 text-gray-800 dark:text-gray-400">
                                Exames
                            </span>
                            {canEditStatus && (
                                <form
                                    onSubmit={addExam}
                                    className="mt-4 flex gap-4"
                                >
                                    <Select
                                        value={selectedExam}
                                        onChange={(e) => {
                                            setSelectedExam(e.target.value);
                                        }}
                                        className="flex-1"
                                        required
                                    >
                                        <Select.Option
                                            value=""
                                            label="Selecione um exame"
                                        />
                                        {exams?.map(({ id, name }) => (
                                            <Select.Option
                                                key={id}
                                                value={id}
                                                label={name}
                                            />
                                        ))}
                                    </Select>
                                    <PrimaryButton>Adicionar</PrimaryButton>
                                </form>
                            )}
                            <ul className="mt-8 text-gray-800 dark:text-gray-200">
                                {appointment.data.exams?.map(({ id, name }) => {
                                    return <li key={id}>{name}</li>;
                                })}
                            </ul>
                        </div>
                        <div className="p-4 sm:p-8  shadow sm:rounded-lg bg-white dark:bg-gray-800">
                            Prescrições
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
