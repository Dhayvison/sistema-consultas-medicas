<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Models\Patient;

class PatientController extends Controller
{
    public function store(StorePatientRequest $request)
    {
        $patient = Patient::create($request->validated());

        return redirect(route('appointment.store', ['patientId' => $patient->id]));
    }
}
