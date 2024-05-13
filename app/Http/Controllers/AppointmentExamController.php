<?php

namespace App\Http\Controllers;

use App\Models\Appointment;

class AppointmentExamController extends Controller
{
    public function store($appointmentId, $examId)
    {
        $appointment = Appointment::find($appointmentId);
        $examId = $examId;

        $appointment->exams()->syncWithoutDetaching([$examId]);

        return redirect(route('appointment.edit', ['id' => $appointmentId]));
    }
}
