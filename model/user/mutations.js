const { 
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
} = require('graphql')
const type = require('./type')
const User = require('./user')
// Defines the mutations
module.exports = {
    addUser: {
        type,
        args: {
            grade:   { type: new GraphQLNonNull(GraphQLString) },
            mail:  { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: User.createEntry.bind(User)
    },
    updateUser: {
        type,
        args: {
            id:     { type: GraphQLID },
            grade:   { type:new GraphQLNonNull(GraphQLString) },
            mail:  { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: User.updateEntry.bind(User)
    },
    sendNotification: {
        type: new GraphQLList(type),
        args: {
            message:   { type:new GraphQLNonNull(GraphQLString) }
        },
        resolve: User.sendNotificationUsers.bind(User)
    }
}
