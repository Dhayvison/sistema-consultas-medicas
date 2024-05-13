<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePrescriptionRequest;
use App\Models\Prescription;

class PrescriptionController extends Controller
{
    public function store(StorePrescriptionRequest $request, $appointmentId)
    {
        $prescription = Prescription::create(
            [
                'appointment_id' => $appointmentId,
                ...$request->validated(),
            ]
        );

        return redirect(route('appointment.edit', ['id' => $appointmentId]));
    }
}
