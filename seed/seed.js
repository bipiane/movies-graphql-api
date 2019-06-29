const mongoose = require('mongoose');

const Utilidades = require('../utilidades');
const Movie = require('../models/movie');
const Cast = require('../models/cast');

let movies = [
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
        description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        fullcast: [
            {actor: 'Sean Astin', character: 'Sam'},
            {actor: 'Sala Baker', character: 'Sauron'},
            {actor: 'Sean Bean', character: 'Boromir'},
            {actor: 'Cate Blanchett', character: 'Galadriel'},
            {actor: 'Orlando Bloom', character: 'Legolas'},
            {actor: 'Billy Boyd', character: 'Pippin'},
            {actor: 'Ian Holm', character: 'Bilbo'},
            {actor: 'Christopher Lee', character: 'Saruman'},
            {actor: 'Andy Serkis', character: 'Gollum'},
            {actor: 'Ian McKellen', character: 'Gandalf'},
            {actor: 'Viggo Mortensen', character: 'Aragorn'},
            {actor: 'Harry Sinclair', character: 'Isildur'},
            {actor: 'Elijah Wood', character: 'Frodo'},
        ]
    },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
        description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        fullcast: [
            {actor: 'Bruce Allpress', character: 'Aldor'},
            {actor: 'Sean Astin', character: 'Sam'},
            {actor: 'Cate Blanchett', character: 'Galadriel'},
            {actor: 'Orlando Bloom', character: 'Legolas'},
            {actor: 'Billy Boyd', character: 'Pippin'},
            {actor: 'Bernard Hill', character: 'Theoden'},
            {actor: 'Bruce Hopkins', character: 'Gamling'},
            {actor: 'Christopher Lee', character: 'Saruman'},
            {actor: 'Ian McKellen', character: 'Gandalf'},
            {actor: 'Viggo Mortensen', character: 'Aragorn'},
            {actor: 'Craig Parker', character: 'Haldir'},
            {actor: 'Andy Serkis', character: 'Gollum'},
            {actor: 'Hugo Weaving', character: 'Elrond'},
            {actor: 'Elijah Wood', character: 'Frodo'},
        ]
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
        description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
        fullcast: [
            {actor: 'Sean Astin', character: 'Sam'},
            {actor: 'John Bach', character: 'Madril'},
            {actor: 'John Bach', character: 'Madril'},
            {actor: 'Sean Bean', character: 'Boromir'},
            {actor: 'Cate Blanchett', character: 'Galadriel'},
            {actor: 'Orlando Bloom', character: 'Legolas'},
            {actor: 'Billy Boyd', character: 'Pippin'},
            {actor: 'Sadwyn Brophy', character: 'Eldarion'},
            {actor: 'Alistair Browning', character: 'Damrod'},
            {actor: 'Bernard Hill', character: 'Theoden'},
            {actor: 'Ian Holm', character: 'Bilbo'},
            {actor: 'Bruce Hopkins', character: 'Gamling'},
            {actor: 'Ian Hughes', character: 'Irolas'},
            {actor: 'Ian McKellen', character: 'Gandalf'},
            {actor: 'Dominic Monaghan', character: 'Merry'},
            {actor: 'Viggo Mortensen', character: 'Aragorn'},
            {actor: 'John Noble', character: 'Denethor'},
            {actor: 'Paul Norell', character: 'King of the Dead'},
            {actor: 'Miranda Otto', character: 'Eowyn'},
            {actor: 'Bruce Phillips', character: 'Grimbold'},
            {actor: 'Andy Serkis', character: 'Gollum'},
            {actor: 'Harry Sinclair', character: 'Isildur'},
            {actor: 'Peter Tait', character: 'Shagrat'},
            {actor: 'Liv Tyler', character: 'Arwen'},
            {actor: 'Karl Urban', character: 'Eomer'},
            {actor: 'Stephen Ure', character: 'Gorbag'},
            {actor: 'Hugo Weaving', character: 'Elrond'},
            {actor: 'David Wenham', character: 'Faramir'},
            {actor: 'Elijah Wood', character: 'Frodo'},
        ]
    },
];

// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/movies_api', {
    useNewUrlParser: true
});

mongoose.connection.once('open', function () {
    console.log('Connection has been made, now drop collections...');

    // Drop all collections before tests
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log('Error fetching collections', err);
        }
        else {
            let promises = [];
            names.forEach(function (e) {
                console.log('- Drop collection', e.name);
                promises.push(mongoose.connection.db.dropCollection(e.name));
            });

            // Wait for all drops
            Promise.all(promises).then(function () {
                console.log('Seed de beast 🦑');

                movies.forEach(movie => {
                    let mov = new Movie({
                        title: movie.title,
                        description: movie.description,
                        year: movie.year,
                    });
                    movie.fullcast.forEach(aCast => {
                        let cast = new Cast({
                            actor: aCast.actor,
                            character: aCast.character,
                            movie: mov
                        });
                        cast.save((err, castSaved) => {
                            if (err) {
                                console.log('errors:', Utilidades.getErrors(err))
                            }
                            if (castSaved) {
                                mov.fullcast.push(cast);
                            }
                        })
                    });

                    mov.save((err, movieSaved) => {
                        if (err) {
                            console.log('errors:', Utilidades.getErrors(err))
                        }
                        if (movieSaved) {
                            console.log(`🎬 '${movieSaved.title}' saved!`);
                        }
                    })
                })
            });
        }
    });
}).on('error', function (error) {
    console.log('Connection error:', error);
});


