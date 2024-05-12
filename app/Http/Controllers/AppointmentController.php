<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\Appointment;
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
                'status' => 'scheduled',
                'started_at' => date_create(),
            ]
        );

        return redirect(route('appointment.edit', ['id' => $appointment->id]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return Inertia::render('Appointment/Edit', [
            'appointment' => Appointment::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
