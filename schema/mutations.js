const { GraphQLObjectType } = require('graphql')
const userMutation = require('../model/user/mutations')

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addUser: userMutation.addUser,
        updateUser: userMutation.updateUser,
        sendNotification: userMutation.sendNotification
    }
})