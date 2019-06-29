'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CastSchema = Schema({
    actor: {
        type: String,
        required: [true, 'El actor es obligatorio'],
        minlength: [4, 'El actor debe tener al menos 4 caracteres'],
        maxlength: [250, 'El actor debe tener menos de 250 caracteres']
    },
    character: {
        type: String,
        required: [true, 'El personaje es obligatorio'],
        minlength: [2, 'El personaje debe tener al menos 2 caracteres'],
        maxlength: [250, 'El personaje debe tener menos de 250 caracteres']
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: [true, 'La película es obligatoria'],
    }
});

const Cast = mongoose.model('cast', CastSchema);

module.exports = Cast;
