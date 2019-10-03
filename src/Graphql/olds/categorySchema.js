// var GraphQLSchema = require('graphql').GraphQLSchema;
// var { GraphQLJSON } = require ('graphql-type-json');
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

// var CategoryModel = require('../Mongoose-Models/Category');

// var typeDefs = new GraphQLObjectType({
//     name: 'category',
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

// var queries = new GraphQLObjectType({
//     name: 'CategoryQuery',
//     fields: function () {
//         return {
//             categories: {
//                 type: new GraphQLList(typeDefs),
//                 resolve: function () {
//                     const categories = CategoryModel.find().exec();
//                     if (!categories) {
//                         throw new Error('Error, Categories Do Not Exist');
//                     }
//                     return categories;
//                 }
//             },
//             categoryById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const categoryDetails = CategoryModel.findById(params.id).exec();
//                     if (!categoryDetails) {
//                         throw new Error('Error, CategoryModel.findById is not found');
//                     }
//                     return categoryDetails;
//                 }
//             }
//         }
//     }
// });

// var mutations = new GraphQLObjectType({
//     name: 'CategoryMutation',
//     fields: function () {
//         return {
//             createCategory: {
//                 type: typeDefs,
//                 args: {
//                     name: {
//                         type: GraphQLString
//                     },
//                     specifications: {
//                         type: GraphQLJSON
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
//                 resolve: function (root, {params}) {
//                     const categoryModel = new CategoryModel(params);
//                     console.log('this is params');
//                     console.log(params);
//                     console.log('this is params.name');
//                     console.log(params.name);
//                     categoryModel.createdDate = new Date();
//                     const newCategory = categoryModel.save();
//                     if (!newCategory) {
//                         throw new Error('Error, Unable To Create New Category');
//                     }
//                     return newCategory;
//                 }
//             },
//             updateCategory: {
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
//                     // updatedDate will handle at Model Schema,
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return CategoryModel.findByIdAndUpdate(params.id, {
//                         name: params.name,
//                         specifications: params.specifications,
//                         status: params.status
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             updateCategoryById: {
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
//                     // updatedDate will handle at Model Schema,
//                     status: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     }
//                 },
//                 resolve(root, params) {
//                     return CategoryModel.findByIdAndUpdate(params.id, {
//                         name: params.name,
//                         specifications: params.specifications,
//                         status: params.status
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             removeCategoryById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     return CategoryModel.findByIdAndUpdate(params.id, {
//                         status: "removed"
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             completelyRemoveCategoryById: {
//                 type: typeDefs,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     var removeCategory;
//                     removeCategory = CategoryModel.findByIdAndRemove(params.id).exec();
//                     if (!removeCategory) {
//                         throw new Error('Error, Category Is Not Found, Cannot Delete!');
//                     }
//                     return removeCategory;
//                 }
//             }
//         }
//     }
// })


// module.exports = new GraphQLSchema({ query: queries, mutation: mutations });