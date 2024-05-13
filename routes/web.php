<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AppointmentExamController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/patient', [PatientController::class, 'store'])->name('patient.store');

    Route::get('/appointment/{patientId}', [AppointmentController::class, 'store'])->name('appointment.store');
    Route::get('/appointment/edit/{id}', [AppointmentController::class, 'edit'])->name('appointment.edit');
    Route::post('/appointment/end/{id}', [AppointmentController::class, 'end'])->name('appointment.end');
    Route::post('/appointment/cancel/{id}', [AppointmentController::class, 'cancel'])->name('appointment.cancel');

    Route::post('/appointment/{appointmentId}/exam/{examId}', [AppointmentExamController::class, 'store'])->name('appointment.exam.store');
    Route::post('/appointment/{appointmentId}/prescription', [PrescriptionController::class, 'store'])->name('appointment.prescription.store');
});

require __DIR__ . '/auth.php';
