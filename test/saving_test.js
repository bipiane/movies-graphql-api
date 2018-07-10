const assert = require('assert');
const Utilidades = require('../utilidades');
const Movie = require('../models/movie');
const Cast = require('../models/cast');

describe('Saving objects', function () {

    let movie = new Movie({
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
        description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    });

    const frodo = new Cast({
        actor: 'Elijah Wood',
        character: 'Frodo',
        movie: movie
    });

    const aragorn = new Cast({
        actor: 'Viggo Mortensen',
        character: 'Aragorn',
        movie: movie
    });

    movie.fullcast.push(frodo);
    movie.fullcast.push(aragorn);

    it('Save movie', function (done) {
        movie.save((err, movieSaved) => {
            if (err) {
                console.log('errors:', Utilidades.getErrors(err))
            }
            if (movieSaved) {
                assert(!movieSaved.isNew);
                done();
            }
        });
    });

    it('Save cast 1', function (done) {
        frodo.save((err, castSaved) => {
            if (err) {
                console.log('errors:', Utilidades.getErrors(err))
            }
            if (castSaved) {
                assert(!castSaved.isNew);
                done();
            }
        });
    });

    it('Save cast 2', function (done) {
        aragorn.save((err, castSaved) => {
            if (err) {
                console.log('errors:', Utilidades.getErrors(err))
            }
            if (castSaved) {
                assert(!castSaved.isNew);
                done();
            }
        });
    });
});
