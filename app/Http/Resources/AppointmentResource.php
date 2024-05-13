<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $spended = $this->getSpendedTime();

        return  [
            'id' => $this->id,
            'status' => $this->status,
            'startedAt' => $this->started_at,
            'endedAt' => $this->ended_at,
            'spended' => $spended ? $spended->format('%h h %i min %S s') : null,
            'patient' => $this->patient,
        ];
    }
}
