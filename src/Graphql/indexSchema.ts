import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

export const schema = () => {
    const resolversArray = fileLoader(path.join(__dirname, "./resolvers/"), { recursive: true, extensions: [".ts"] });
    const typesArray = fileLoader(path.join(__dirname, "./types/"), { recursive: true, extensions: [".gql"] });
    const resolvers = mergeResolvers(resolversArray);
    const typeDefs = mergeTypes(typesArray, { all: true });
    // tslint:disable-next-line: object-literal-shorthand
    return makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
};