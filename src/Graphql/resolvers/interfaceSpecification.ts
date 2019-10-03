import { interfaceSpecificationModel } from "../../Mongoose-Models/InterfaceSpecification";
import { errorMessage } from "../message/error";
import { PubSub, PubSubEngine } from "apollo-server";


export default {
    Query: {
        async isNameInterfaceSpecificationExists(root: any, { name }: any) {
            console.log(`Find Name: ${name}`);
            // tslint:disable-next-line: object-literal-shorthand
            return await interfaceSpecificationModel.findOne({ name: name }) ? true : false;
        },
        async isNameInterfaceSpecificationExistsOnUpdate(root: any, { id, name }: any) {
            const list = await interfaceSpecificationModel.find({ name });
            console.log(list.length);
            /*
             Name is accept if length = 0 (New Name) or length = 1; If length = 1, check Id and Name is same with params or not. If same, return false
             Another Case is retrun true
            */
            if (list.length === 0) {
                return false;
            }
            if (list.length === 1) {
                const element = list[0];
                console.log(element);
                console.log(`element._id: ${element.id}\t params._id: ${id}`);
                if ((element._id).equals(id)) {
                    console.log("Equals");
                    return false;
                }
            }
            console.log(`${id}\t${name}`);
            return true;
        },
        getAllInterfaceSpecifications() {
            console.log("getAllInterfaceSpecifications");
            const list = interfaceSpecificationModel.find().exec();
            if (!list) {
                return { ok: false };
            }

            return { ok: true, data: list };
        },
        getListInterfaceSpecifications() {
            console.log("getListInterfaceSpecification");
            const list = interfaceSpecificationModel.find().exec();
            if (!list) {
                return { ok: false };
            }

            return list;
        },
        async getInterfaceSpecification(root: any, { id }: any) {
            console.log(`getInterfaceSpecification`);
            const objDetails = await interfaceSpecificationModel.findById(id);
            console.log("objDetails");
            console.log(objDetails);
            if (!objDetails) {
                return { ok: false };
            }
            return { ok: true, data: objDetails };
            // return new PubSub().publish("getInterfaceSpecificationSubscription", { id: id });
        },
        getInterfaceSpecificationByName(root: any, { name }: any) {
            console.log(`getInterfaceSpecification`);
            // tslint:disable-next-line: object-literal-shorthand
            const objDetails = interfaceSpecificationModel.findOne({ name: name });
            if (!objDetails) {
                return { ok: false };
            }
            return { ok: true, data: objDetails };
        }
    },

    Mutation: {
        async createInterfaceSpecification(root: any, params: any) {
            console.log("this is params:");
            console.log(params);
            params.createdDate = new Date();
            // Check Name duplicate or not
            if (await interfaceSpecificationModel.findOne({ name: params.name })) {
                return { ok: false, message: "Cannot Execute", errorMessage: { message: "Name Already Exists", fields: { name: errorMessage.duplicated_name } } };
            }
            const model = new interfaceSpecificationModel(params);
            const savedModel = model.save();
            if (!savedModel) {
                console.log("Cannot Save");
                return { ok: false, message: "Cannot Save", errorMessage: { message: "Error, Cannot Save. Something Wrong" } };
            }
            console.log("Saved");
            return { ok: true, data: savedModel };
        },
        async updateInterfaceSpecification(root: any, params: any) {
            params.updatedDate = new Date();
            console.log("new Params: ");
            console.log(params);
            const savedModel = await interfaceSpecificationModel.findByIdAndUpdate(params.id, params);
            if (!savedModel) {
                console.log("Cannot Save");
                return { ok: false, message: "Cannot Update", errorMessage: { message: "Error, Cannot Update. Something Wrong" } };
            }
            console.log("Save");
            return { ok: true, data: savedModel };
        }
    }
};