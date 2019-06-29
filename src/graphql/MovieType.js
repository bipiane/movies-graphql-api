const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');

const Cast = require('../models/cast');

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
            type: new GraphQLList(require('./CastType')),
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

module.exports = MovieType;