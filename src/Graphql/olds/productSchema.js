// var GraphQLSchema = require('graphql').GraphQLSchema;
// var GraphQLID = require('graphql').GraphQLID;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLList = require('graphql').GraphQLList;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var GraphQLNonNull = require('graphql').GraphQLNonNull;
// var GraphQLString = require('graphql').GraphQLString;
// var GraphQLInt = require('graphql').GraphQLInt;
// var GraphQLFloat = require('graphql').GraphQLFloat
// var GraphQLDate = require('graphql-iso-date').GraphQLDate;
// var GraphQLTime = require('graphql-iso-date').GraphQLTime;
// var GraphQLDateTime = require('graphql-iso-date').GraphQLDateTime;

// var ProductModel = require('../Mongoose-Models/Product');

// var productType = new GraphQLObjectType({
//     name: 'product',
//     fields: function () {
//         return {
//             _id: {
//                 type: GraphQLString
//             },
//             name: {
//                 type: GraphQLString
//             },
//             category: {
//                 type: GraphQLString
//             },
//             price: {
//                 type: GraphQLFloat
//             },
//             quantity: {
//                 type: GraphQLInt
//             },
//             specifications?: {
//                 type: GraphQLObjectType
//             },
//             createdDate: {
//                 type: GraphQLDateTime
//             },
//             updatedDate: {
//                 type: GraphQLDateTime
//             },
//         }
//     }
// });

// var queryType = new GraphQLObjectType({
//     name: 'ProductQuery',
//     fields: function () {
//         return {
//             products: {
//                 type: new GraphQLList(productType),
//                 resolve: function () {
//                     const products = ProductModel.find().exec();
//                     if (!products) {
//                         throw new Error('Error, Products Do Not Exist');
//                     }
//                     return products;
//                 }
//             },
//             productById: {
//                 type: productsType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const productDetails = ProductModel.findById(params.id).exec();
//                     if (!productDetails) {
//                         throw new Error('Error, ProductModel.findById is not found');
//                     }
//                     return productDetails;
//                 }
//             }
//         }
//     }
// });

// var mutation = new GraphQLObjectType({
//     name: 'ProductMutation',
//     fields: function () {
//         return {
//             createProduct: {
//                 type: productType,
//                 args: {
//                     _id: {
//                         type: GraphQLString
//                     },
//                     name: {
//                         type: GraphQLString
//                     },
//                     category: {
//                         type: GraphQLString
//                     },
//                     price: {
//                         type: GraphQLFloat
//                     },
//                     quantity: {
//                         type: GraphQLInt
//                     },
//                     specifications?: {
//                         type: GraphQLObjectType
//                     },
//                     createdDate: {
//                         type: GraphQLDateTime
//                     },
//                     status: {
//                         type: GraphQLString
//                     }
//                 },
//                 resolve: function (root, params) {
//                     const ProductModel = new ProductModel(params);
//                     ProductModel.createdDate = new Date();
//                     const newProduct = ProductModel.save();
//                     if (!newProduct) {
//                         throw new Error('Error, Unable To Create New Product');
//                     }
//                     return newProduct;
//                 }
//             },
//             updateProduct: {
//                 type: productType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: new GraphQLNonNull(GraphQLString),
//                         defaultValue: undefined
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     category: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     price: {
//                         type: new GraphQLNonNull(GraphQLFloat)
//                     },
//                     quantity: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     specifications?: {
//                         type: GraphQLObjectType
//                     },
//                     createdDate: {
//                         type: new GraphQLNonNull(GraphQLFloat)
//                     },
//                     status: {
//                         type: new GraphQLNonNull(GraphQLFloat)
//                     }
//                 },
//                 resolve(root, params) {
//                     return ProductModel.findByIdAndUpdate(params.id, {
//                         name: params.name,
//                         category: params.category,
//                         price: params.price,
//                         quantity: params.quantity,
//                         specifications: params.specifications,
//                         status: params.status
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             removeProductById: {
//                 type: productType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     return ProductModel.findByIdAndUpdate(params.id, {
//                         status: "removed"
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             updateProductById: {
//                 type: productType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: new GraphQLNonNull(GraphQLString),
//                         defaultValue: undefined
//                     },
//                     name: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     category: {
//                         type: new GraphQLNonNull(GraphQLString)
//                     },
//                     price: {
//                         type: new GraphQLNonNull(GraphQLFloat)
//                     },
//                     quantity: {
//                         type: new GraphQLNonNull(GraphQLInt)
//                     },
//                     specifications?: {
//                         type: GraphQLObjectType
//                     },
//                     createdDate: {
//                         type: new GraphQLNonNull(GraphQLFloat)
//                     },
//                     status: {
//                         type: new GraphQLNonNull(GraphQLFloat)
//                     }
//                 },
//                 resolve(root, params) {
//                     return ProductModel.findByIdAndUpdate(params.id, {
//                         name: params.name,
//                         category: params.category,
//                         price: params.price,
//                         quantity: params.quantity,
//                         specifications: params.specifications,
//                         status: params.status
//                     }, function (err) {
//                         if (err) return next(err);
//                     });
//                 }
//             },
//             completelyRemoveProductById: {
//                 type: productType,
//                 args: {
//                     id: {
//                         name: '_id',
//                         type: GraphQLString
//                     }
//                 },
//                 resolve(root, params) {
//                     var removeProduct;
//                     removeProduct = ProductModel.findByIdAndRemove(params.id).exec();
//                     if (!removeProduct) {
//                         throw new Error('Error, Product Is Not Found, Cannot Delete!');
//                     }
//                     return removeProduct;
//                 }
//             }
//         }
//     }
// })

// module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });