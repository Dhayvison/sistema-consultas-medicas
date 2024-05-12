<?php

namespace App\Models\Enums;

enum AppointmentStatus: string
{
    case Started = 'started';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
}
