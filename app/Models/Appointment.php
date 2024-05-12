<?php

namespace App\Models;

use App\Models\Enums\AppointmentStatus;
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

    public function canEditStatus()
    {
        return $this->status === AppointmentStatus::Started->value;
    }
}
