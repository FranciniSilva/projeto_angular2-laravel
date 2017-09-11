<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    protected $tabel = 'banks';
    protected $fillable = ['title', 'code'];
}
