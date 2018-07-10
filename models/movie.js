'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        minlength: [4, 'El título debe tener al menos 4 caracteres'],
        maxlength: [250, 'El título debe tener menos de 250 caracteres']
    },
    year: {
        type: Number,
        required: [true, 'El año de lanzamiento es obligatorio'],
    },
    description: {
        type: String,
        maxlength: [250, 'La descripción debe tener menos de 250 caracteres']
    },
    fullcast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cast'
    }]
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
