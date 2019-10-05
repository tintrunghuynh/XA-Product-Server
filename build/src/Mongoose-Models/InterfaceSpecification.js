"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var interfaceSpecification = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    specifications: {
        type: Object,
    },
    descriptions: {
        type: String
    },
    createdDate: {
        type: Date
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
    }
});
exports.interfaceSpecificationModel = mongoose_1.default.model("InterfaceSpecificationSchema", interfaceSpecification, "interfaceSpecification");
/*
// Custom Function
model.isNameExists = async function (name) {
    return await model.findOne({ name: name }, function (err, obj) {
        return obj !== null ? true : false;
    })
}
*/
// module.exports = model;
