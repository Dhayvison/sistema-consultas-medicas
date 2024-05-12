<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Enums\AppointmentStatus;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppointmentRequest $request, $patientId)
    {
        $appointment = Appointment::create(
            [
                'patient_id' => $patientId,
                'user_id' => $request->user()->id,
                'status' => AppointmentStatus::Started->value,
                'started_at' => date_create(),
            ]
        );

        return redirect(route('appointment.edit', ['id' => $appointment->id]));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $appointment = Appointment::find($id);

        return Inertia::render('Appointment/Edit', [
            'appointment' =>  new AppointmentResource($appointment),
            'canEditStatus' => $appointment->canEditStatus(),
        ]);
    }

    public function end($id)
    {
        $appointment = Appointment::find($id);
        $appointment->status = AppointmentStatus::Completed->value;
        $appointment->ended_at = date_create();

        $appointment->save();
        return redirect(route('appointment.edit', ['id' => $appointment->id]));
    }

    public function cancel($id)
    {
        $appointment = Appointment::find($id);
        $appointment->status = AppointmentStatus::Cancelled->value;

        $appointment->save();
        return redirect(route('appointment.edit', ['id' => $appointment->id]));
    }
}
