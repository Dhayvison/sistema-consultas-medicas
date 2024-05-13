import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import AppointmentStatusIndicator from "./Components/AppointmentStatusIndicator";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";

export default function Edit({ auth, appointment, canEditStatus }) {
    const { post, processing } = useForm();

    const cancelAppointment = () => {
        post(route("appointment.cancel", { id: appointment.data.id }));
    };

    const endAppointment = () => {
        post(route("appointment.end", { id: appointment.data.id }));
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
