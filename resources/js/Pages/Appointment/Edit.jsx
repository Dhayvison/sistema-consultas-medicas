import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AppointmentStatusIndicator from "./Components/AppointmentStatusIndicator";

export default function Edit({ auth, appointment }) {
    console.log(appointment);
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
                        <div className="flex justify-between">
                            <AppointmentStatusIndicator
                                statusText={appointment.data.status}
                            />

                            <div className="text-xs">
                                {new Date(
                                    appointment.data.startedAt
                                ).toLocaleString()}
                            </div>
                        </div>

                        <section className="font-semibold mt-8 text-gray-800 dark:text-gray-400">
                            Dados do Paciente
                            <div className="text-black dark:text-gray-200">
                                <div className="text-2xl">
                                    {appointment.data.patient.name}
                                </div>
                                <div>{appointment.data.patient.age} anos</div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
