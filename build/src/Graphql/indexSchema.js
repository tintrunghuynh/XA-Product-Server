"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var path = __importStar(require("path"));
exports.schema = function () {
    var resolversArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./resolvers/"), { recursive: true, extensions: [".ts"] });
    var typesArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./types/"), { recursive: true, extensions: [".gql"] });
    var resolvers = merge_graphql_schemas_1.mergeResolvers(resolversArray);
    var typeDefs = merge_graphql_schemas_1.mergeTypes(typesArray, { all: true });
    // tslint:disable-next-line: object-literal-shorthand
    return graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
};
