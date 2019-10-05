"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_type_json_1 = require("graphql-type-json");
var graphql_iso_date_1 = require("graphql-iso-date");
// import { GraphQLUpload } from "graphql-upload";
exports.default = {
    JSON: graphql_type_json_1.GraphQLJSON,
    Date: graphql_iso_date_1.GraphQLDate,
};
