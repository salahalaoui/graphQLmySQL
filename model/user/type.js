let {
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        grade: {
            type: new GraphQLNonNull(GraphQLString)
        },
        mail: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
})