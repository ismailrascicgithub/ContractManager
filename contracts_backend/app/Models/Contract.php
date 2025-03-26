<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Contract extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['client_id', 'reference', 'start_date', 'duration', 'value'];
    protected $appends = ['end_date'];
    protected $dates = ['deleted_at']; 

    public function getEndDateAttribute()
    {
        return $this->start_date
            ? Carbon::parse($this->start_date)->addMonths($this->duration)->format('Y-m-d')
            : null;
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function comments()
    {
        return $this->hasMany(ContractComment::class);
    }

}