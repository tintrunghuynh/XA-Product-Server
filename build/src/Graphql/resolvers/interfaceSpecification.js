"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var InterfaceSpecification_1 = require("../../Mongoose-Models/InterfaceSpecification");
var error_1 = require("../message/error");
exports.default = {
    Query: {
        isNameInterfaceSpecificationExists: function (root, _a) {
            var name = _a.name;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("Find Name: " + name);
                            return [4 /*yield*/, InterfaceSpecification_1.interfaceSpecificationModel.findOne({ name: name })];
                        case 1: 
                        // tslint:disable-next-line: object-literal-shorthand
                        return [2 /*return*/, (_b.sent()) ? true : false];
                    }
                });
            });
        },
        isNameInterfaceSpecificationExistsOnUpdate: function (root, _a) {
            var id = _a.id, name = _a.name;
            return __awaiter(this, void 0, void 0, function () {
                var list, element;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, InterfaceSpecification_1.interfaceSpecificationModel.find({ name: name })];
                        case 1:
                            list = _b.sent();
                            console.log(list.length);
                            /*
                             Name is accept if length = 0 (New Name) or length = 1; If length = 1, check Id and Name is same with params or not. If same, return false
                             Another Case is retrun true
                            */
                            if (list.length === 0) {
                                return [2 /*return*/, false];
                            }
                            if (list.length === 1) {
                                element = list[0];
                                console.log(element);
                                console.log("element._id: " + element._id + "\t params._id: " + id);
                                if ((element._id).Equals(id)) {
                                    console.log("Equals");
                                    return [2 /*return*/, false];
                                }
                            }
                            console.log(id + "\t" + name);
                            return [2 /*return*/, true];
                    }
                });
            });
        },
        getAllInterfaceSpecifications: function () {
            console.log("getAllInterfaceSpecifications");
            var list = InterfaceSpecification_1.interfaceSpecificationModel.find().exec();
            if (!list) {
                return { ok: false };
            }
            return { ok: true, data: list };
        },
        getListInterfaceSpecifications: function () {
            console.log("getListInterfaceSpecification");
            var list = InterfaceSpecification_1.interfaceSpecificationModel.find().exec();
            if (!list) {
                return { ok: false };
            }
            return list;
        },
        getInterfaceSpecification: function (root, _a) {
            var id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                var objDetails;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("getInterfaceSpecification");
                            return [4 /*yield*/, InterfaceSpecification_1.interfaceSpecificationModel.findById(id)];
                        case 1:
                            objDetails = _b.sent();
                            console.log("objDetails");
                            console.log(objDetails);
                            if (!objDetails) {
                                return [2 /*return*/, { ok: false }];
                            }
                            return [2 /*return*/, { ok: true, data: objDetails }];
                    }
                });
            });
        },
        getInterfaceSpecificationByName: function (root, _a) {
            var name = _a.name;
            console.log("getInterfaceSpecification");
            // tslint:disable-next-line: object-literal-shorthand
            var objDetails = InterfaceSpecification_1.interfaceSpecificationModel.findOne({ name: name });
            if (!objDetails) {
                return { ok: false };
            }
            return { ok: true, data: objDetails };
        }
    },
    Mutation: {
        createInterfaceSpecification: function (root, params) {
            return __awaiter(this, void 0, void 0, function () {
                var model, savedModel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("this is params:");
                            console.log(params);
                            params.createdDate = new Date();
                            return [4 /*yield*/, InterfaceSpecification_1.interfaceSpecificationModel.findOne({ name: params.name })];
                        case 1:
                            // Check Name duplicate or not
                            if (_a.sent()) {
                                return [2 /*return*/, { ok: false, message: "Cannot Execute", errorMessage: { message: "Name Already Exists", fields: { name: error_1.errorMessage.duplicated_name } } }];
                            }
                            model = new InterfaceSpecification_1.interfaceSpecificationModel(params);
                            savedModel = model.save();
                            if (!savedModel) {
                                console.log("Cannot Save");
                                return [2 /*return*/, { ok: false, message: "Cannot Save", errorMessage: { message: "Error, Cannot Save. Something Wrong" } }];
                            }
                            console.log("Saved");
                            return [2 /*return*/, { ok: true, data: savedModel }];
                    }
                });
            });
        },
        updateInterfaceSpecification: function (root, params) {
            return __awaiter(this, void 0, void 0, function () {
                var savedModel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params.updatedDate = new Date();
                            console.log("new Params: ");
                            console.log(params);
                            return [4 /*yield*/, InterfaceSpecification_1.interfaceSpecificationModel.findByIdAndUpdate(params.id, params)];
                        case 1:
                            savedModel = _a.sent();
                            if (!savedModel) {
                                console.log("Cannot Save");
                                return [2 /*return*/, { ok: false, message: "Cannot Update", errorMessage: { message: "Error, Cannot Update. Something Wrong" } }];
                            }
                            console.log("Save");
                            return [2 /*return*/, { ok: true, data: savedModel }];
                    }
                });
            });
        }
    }
};
