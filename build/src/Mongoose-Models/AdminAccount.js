"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var admAccount = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    roles: {
        type: [String],
        required: true,
    },
    specifications: {
        type: Object,
    },
    descriptions: {
        type: String
    },
    salt: {
        type: String
    },
    hash: {
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
exports.admAccountModel = mongoose_1.default.model("ADMAccountSchema", admAccount, "admAccount");
/*
// Custom Function
model.isNameExists = async function (name) {
    return await model.findOne({ name: name }, function (err, obj) {
        return obj !== null ? true : false;
    })
}
*/
// module.exports = model;
