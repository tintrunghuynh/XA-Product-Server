"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
/* GET users listing. */
exports.router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
