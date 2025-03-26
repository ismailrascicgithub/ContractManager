<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContractComment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['contract_id', 'comment', 'created_by'];
    protected $with = ['author'];
    protected $dates = ['deleted_at'];


    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}