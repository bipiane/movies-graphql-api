const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const Movie = require('../models/movie');

const MovieType = require('./MovieType');

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

module.exports = CastType;