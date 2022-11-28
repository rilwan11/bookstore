const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
} = graphql;

const bookType = new GraphQLObjectType({
    name: 'BookStore',
    fields: () => ({
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        author: {type: GraphQLString},
        isbn: {type: GraphQLString},
        category: {type: GraphQLString},
        inventory: {type: GraphQLInt},
        notes: {type: GraphQLString},
        status: {type: GraphQLString},
    })
});

module.exports = bookType;