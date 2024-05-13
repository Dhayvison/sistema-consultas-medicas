<?php

namespace App\Models;

use App\Models\Enums\AppointmentStatus;
use DateTime;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasUuids;

    public $timestamps = false;
    protected $fillable = ['status', 'started_at', 'ended_at', 'user_id', 'patient_id'];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'ended_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function exams()
    {
        return $this->belongsToMany(Exam::class, 'appointment_exams');
    }

    public function canEditStatus()
    {
        return $this->status === AppointmentStatus::Started->value;
    }

    public function getSpendedTime()
    {
        $startedDate = $this->started_at;

        if ($this->ended_at) {
            return $startedDate->diff($this->ended_at);
        } else if ($this->status !== AppointmentStatus::Cancelled->value) {
            return $startedDate->diff(new DateTime());
        }

        return null;
    }
}
