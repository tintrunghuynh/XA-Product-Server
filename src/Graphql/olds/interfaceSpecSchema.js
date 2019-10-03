// var GraphQLSchema = require('graphql').GraphQLSchema;
// var { GraphQLJSON } = require('graphql-type-json');
// var GraphQLID = require('graphql').GraphQLID;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLList = require('graphql').GraphQLList;
// var GraphQLNonNull = require('graphql').GraphQLNonNull;
// var GraphQLString = require('graphql').GraphQLString;
// var GraphQLInt = require('graphql').GraphQLInt;
// var GraphQLFloat = require('graphql').GraphQLFloat
// var GraphQLDate = require('graphql-iso-date').GraphQLDate;
// var GraphQLTime = require('graphql-iso-date').GraphQLTime;
// var GraphQLDateTime = require('graphql-iso-date').GraphQLDateTime;
// var InterfaceSpecModel = require('../Mongoose-Models/InterfaceSpecification');

// const typeDefs = new GraphQLObjectType({
//     name: 'interfaceSpec',
//     fields: function () {
//         return {
//             _id: {
//                 type: GraphQLString
//             },
//             name: {
//                 type: GraphQLString
//             },
//             specifications: {
//                 type: GraphQLJSON
//             },
//             descriptions: {
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
//             }
//         }
//     }
// });


// const queries = new GraphQLObjectType({
//     name: 'InterfaceSpecQuery',
//     fields: function () {
//         return {
//             interfaceSpecList: {
//                 type: new GraphQLList(typeDefs),
//                 resolve: function () {
//                     const interfaceSpecList = InterfaceSpecModel.find().exec();
//                     if (!interfaceSpecList) {
//                         throw new Error('Error, Interface Specification Do Not Exist');
//                     }
//                     return interfaceSpecList;
//                 }
//             },
//             interfaceSpecById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const interfaceSpecDetails = InterfaceSpecModel.findById(params.id).exec();
//                     if (!interfaceSpecDetails) {
//                         throw new Error('Error, InterfaceSpecModel.findById is not found');
//                     }
//                     return interfaceSpecDetails;
//                 }
//             }
//         }
//     }
// });

// const mutations = new GraphQLObjectType({
//     name: 'InterfaceSpecMutation',
//     fields: function () {
//         return {
//             createInterfaceSpec: {
//                 type: typeDefs,
//                 args: {
//                     name: {
//                         type: GraphQLString
//                     },
//                     specifications: {
//                         type: GraphQLJSON
//                     },
//                     descriptions: {
//                         type: GraphQLString
//                     },
//                     createdDate: {
//                         type: GraphQLDateTime
//                     },
//                     updatedDate: {
//                         type: GraphQLDateTime
//                     },
//                     status: {
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const interfaceSpecModel = new InterfaceSpecModel(params);
//                     interfaceSpecModel.createdDate = new Date();
//                     const newInterfaceSpec = interfaceSpecModel.save();
//                     if (!newInterfaceSpec) {
//                         throw new Error('Error, Unable To Create New Interface Specification');
//                     }
//                     return newInterfaceSpec;
//                 }
//             },
//             updateInterfaceSpec: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: new GraphQLNonNull(GraphQLString),
//                         defaultValue: undefined
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     specifications: {
//                         type: GraphQLJSON
//                     },
//                     descriptions: {
//                         type: GraphQLString
//                     },
//                     // updatedDate will handle at Model Schema,
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return CategoryModel.findByIdAndUpdate(params.id, {
//                         name: params.name,
//                         specifications: params.specifications,
//                         descriptions: params.descriptions,
//                         status: params.status
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             updateInterfaceSpecById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: new GraphQLNonNull(GraphQLString),
//                         defaultValue: undefined
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     specifications: {
//                         type: GraphQLJSON

//                     },
//                     descriptions: {
//                         type: GraphQLString
//                     },
//                     // updatedDate will handle at Model Schema,
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return InterfaceSpecModel.findByIdAndUpdate(params.id, {
//                         name: params.name,
//                         specifications: params.specifications,
//                         descriptions: params.descriptions,
//                         status: params.status
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             removeInterfaceSpecById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     return InterfaceSpecModel.findByIdAndUpdate(params.id, {
//                         status: "removed"
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             completelyRemoveInterfaceSpecById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     var removeInterfaceSpec;
//                     removeInterfaceSpec = InterfaceSpecModel.findByIdAndRemove(params.id).exec();
//                     if (!removeInterfaceSpec) {
//                         throw new Error('Error, Interface Specification Is Not Found, Cannot Delete!');
//                     }
//                     return removeInterfaceSpec;
//                 }
//             }
//         }
//     }
// })

// // module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
// module.exports =  { typeDefs, queries, mutations };