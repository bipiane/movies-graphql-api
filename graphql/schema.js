const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const Movie = require('../models/movie');
const Cast = require('../models/cast');

const CastType = new GraphQLObjectType({
    name: 'Cast',
    description: 'Reparto de la película',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: cast => cast._id
        },
        actor: {
            type: GraphQLString,
            resolve: cast => cast.actor
        },
        character: {
            type: GraphQLString,
            resolve: cast => cast.character
        },
        movie: {
            type: MovieType,
            resolve: cast => {
                return Movie.findById(cast.movie)
            }
        }
    })
});

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'Película',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: movie => movie._id
        },
        title: {
            type: GraphQLString,
            resolve: movie => movie.title
        },
        year: {
            type: GraphQLInt,
            description: 'Año de lanzamiento',
            resolve: movie => movie.year
        },
        description: {
            type: GraphQLString,
            resolve: movie =>
                movie.description
        },
        fullcast: {
            type: new GraphQLList(CastType),
            description: 'Lista completa del reparto',
            resolve: movie => {
                let promises = [];
                movie.fullcast.forEach(idCast => {
                    promises.push(Cast.findById(idCast))
                });
                return Promise.all(promises);
            }
        }
    })
});

module.exports = new GraphQLSchema({
    //query
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'Consulta de películas y su reparto',
        fields: () => ({
            movie: {
                type: MovieType,
                description: 'Obtener una película por ID',
                args: {
                    id: {type: new GraphQLNonNull(GraphQLString)}
                },
                resolve: (root, args) => {
                    return Movie.findById(args.id)
                }
            },
            allMovies: {
                type: new GraphQLList(MovieType),
                description: 'Lista de películas',
                resolve: () => {
                    return Movie.find({})
                }
            },
            moviesByTitle: {
                type: new GraphQLList(MovieType),
                description: 'Lista de películas por título',
                args: {
                    title: {type: new GraphQLNonNull(GraphQLString)}
                },
                resolve: (root, args) => {
                    const regex = new RegExp(args.title, "i");
                    return Movie.find({title: regex})
                }
            },
            cast: {
                type: CastType,
                description: 'Obtener un reparto por ID',
                args: {
                    id: {type: GraphQLString}
                },
                resolve: (root, args) => {
                    return Cast.findById(args.id)
                }
            },
            allCast: {
                type: new GraphQLList(CastType),
                description: 'Lista de reparto',
                resolve: () => {
                    return Cast.find({})
                }
            },
        })
    }),
    // mutation
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addMovie: {
                type: MovieType,
                args: {
                    title: {
                        name: 'titulo',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    year: {
                        name: 'Año',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (obj, {title, year}, source, fieldASTs) => {
                    let movie = new Movie();
                    movie.title = title;
                    movie.year = year;
                    return movie.save();
                }
            },
            deleteMovie: {
                type: MovieType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (obj, {id}, source, fieldASTs) => {
                    return Movie.findOneAndRemove({_id: id});
                }
            },
            addCast: {
                type: CastType,
                args: {
                    actor: {
                        name: 'Actor',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    character: {
                        name: 'Personaje',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    movie: {
                        name: 'Id de Película',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve: (obj, {actor, character, movie}, source, fieldASTs) => {
                    let cast = new Cast();
                    cast.actor = actor;
                    cast.character = character;
                    cast.movie = movie;
                    return cast.save();
                }
            },
            deleteCast: {
                type: CastType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (obj, {id}, source, fieldASTs) => {
                    return Cast.findOneAndRemove({_id: id});
                }
            },
        }
    })
});
