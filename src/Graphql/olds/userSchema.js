// var GraphQLSchema = require('graphql').GraphQLSchema;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLList = require('graphql').GraphQLList;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLNonNull = require('graphql').GraphQLNonNull;
// var GraphQLID = require('graphql').GraphQLID;
// var GraphQLString = require('graphql').GraphQLString;
// var GraphQLInt = require('graphql').GraphQLInt
// var GraphQLDate = require('graphql-iso-date').GraphQLDate;
// var GraphQLTime = require('graphql-iso-date').GraphQLTime;
// var GraphQLDateTime = require('graphql-iso-date').GraphQLDateTime;

// var UserModel = require('../Mongoose-Models/User');

// var userType = new GraphQLObjectType({
//     name: 'user',
//     fields: function () {
//         return {
//             _id: {
//                 type: GraphQLString
//             },
//             email: {
//                 type: GraphQLString
//             },
//             name: {
//                 type: GraphQLString
//             },
//             salt: {
//                 type: GraphQLString
//             },
//             hash: {
//                 type: GraphQLString
//             },
//             createdDate: {
//                 type: GraphQLDateTime
//             },
//             updatedDate: {
//                 type: GraphQLDateTime
//             },
//             status: {
//                 type: GraphQLString
//             },
//         }
//     }
// });

// var queryType = new GraphQLObjectType({
//     name: 'UserQuery',
//     fields: function () {
//         return {
//             users: {
//                 type: new GraphQLList(userType),
//                 resolve: function () {
//                     const users = UserModel.find().exec();
//                     if (!users) {
//                         throw new Error('Error, Users Do Not Exist');
//                     }
//                     return users;
//                 }
//             },
//             userById: {
//                 type: userType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const userDetails = UserModel.findById(params.id).exec();
//                     if (!userDetails) {
//                         throw new Error('Error, UserModel.findById is not found');
//                     }
//                     return userDetails;
//                 }
//             },
//             userByEmail: {
//                 type: userType,
//                 args: {
//                     email: {
//                         name: 'email',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const userDetails = UserModel.findOne({ email: params.email }).exec();
//                     if (!userDetails) {
//                         throw new Error(`Error, findOne{email = ${params.email}} is not found`)
//                     };
//                     return userDetails;
//                 }
//             }
//         }
//     }
// });

// var mutation = new GraphQLObjectType({
//     name: 'UserMutation',
//     fields: function () {
//         return {
//             createUser: {
//                 type: userType,
//                 args: {
//                     email: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     salt: {
//                         type: new GraphQLNonNull(GraphQLString)

//                     },
//                     hash: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     createdDate: {
//                         type: GraphQLDateTime
//                     },
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const userModel = new UserModel(params);
//                     userModel.createdDate = new Date();
//                     const newUser = userModel.save();
//                     if (!newUser) {
//                         throw new Error('Error, Unable To Register New User');
//                     }
//                     return newUser;
//                 }
//             },
//             updateUserById: {
//                 type: userType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: new GraphQLNonNull(GraphQLString),
//                         defaultValue: undefined
//                     }, email: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     salt: {
//                         type: new GraphQLNonNull(GraphQLString)

//                     },
//                     hash: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return UserModel.findByIdAndUpdate(params.id, {
//                         email: params.email,
//                         name: params.name,
//                         salt: params.salt,
//                         hash: params.hash,
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             updateUser: {
//                 type: userType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: new GraphQLNonNull(GraphQLString),
//                         defaultValue: undefined
//                     }, email: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     salt: {
//                         type: new GraphQLNonNull(GraphQLString)

//                     },
//                     hash: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return UserModel.findByIdAndUpdate(params.id, {
//                         email: params.email,
//                         name: params.name,
//                         salt: params.salt,
//                         hash: params.hash,
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             updateUserByEmail: {
//                 type: userType,
//                 args: {
//                     email: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     salt: {
//                         type: new GraphQLNonNull(GraphQLString)

//                     },
//                     hash: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return UserModel.findOneAndUpdate({ email: params.email }, {
//                         email: params.email,
//                         name: params.name,
//                         salt: params.salt,
//                         hash: params.hash,
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             removeUserById: {
//                 type: userType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     return UserModel.findByIdAndUpdate(params.id, {
//                         status: "removed"
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             removeUserByEmail: {
//                 type: userType,
//                 args: {
//                     email: {
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     return UserModel.findOneAndUpdate({ email: params.email }, {
//                         status: "removed"
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             completelyRemoveUserById: {
//                 type: userType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     var removeUser;
//                     removeUser = UserModel.findByIdAndRemove(params.id).exec();
//                     if (!removeUser) {
//                         throw new Error('Error, User Is Not Found, Cannot Delete!');
//                     }
//                     return removeUser;
//                 }
//             },
//             completelyRemoveUserByEmail: {
//                 type: userType,
//                 args: {
//                     email: {
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     var removeUser;
//                     removeUser = UserModel.findOneAndRemove({ email: params.email }).exec();
//                     if (!removeUser) {
//                         throw new Error('Error, User Is Not Found, Cannot Delete!');
//                     }
//                     return removeUser;
//                 }
//             }
//         }
//     }
// })

// module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });