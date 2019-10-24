import mongoose from "mongoose";

const admAccount = new mongoose.Schema({
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

export const admAccountModel = mongoose.model("ADMAccountSchema", admAccount, "admAccount");

/*
// Custom Function
model.isNameExists = async function (name) {
    return await model.findOne({ name: name }, function (err, obj) {
        return obj !== null ? true : false;
    })
}
*/

// module.exports = model;
