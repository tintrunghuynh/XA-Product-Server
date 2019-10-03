import mongoose from "mongoose";

const interfaceSpecification = new mongoose.Schema({
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

export const interfaceSpecificationModel = mongoose.model("InterfaceSpecificationSchema", interfaceSpecification, "interfaceSpecification");

/*
// Custom Function
model.isNameExists = async function (name) {
    return await model.findOne({ name: name }, function (err, obj) {
        return obj !== null ? true : false;
    })
}
*/

// module.exports = model;
