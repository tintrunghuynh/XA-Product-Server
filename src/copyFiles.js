/**
 * The TypeScript Compiler (TSC) compile TS only into JS in build/dist folder.
 * So we need to write the function to copy another file that is not TS files into the build/dist folder, like gpl or certificate ssl/tls  files.
 */
var path = require("path");
var fs = require("fs");

//console.log(process.env.NODE_ENV);
//console.log(`__dirname: ${__dirname}`);
//console.log(`Environment: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "DEV") {
    //console.log("copyFileDefInDev");
    copyFileDefInDev();
} else if (process.env.NODE_ENV === "PROD") {
    //console.log("copyFileDefInProd");
    copyFileDefInProd();
}


function copyFileDefInDev() {
    const shell = require("child_process").execSync;
    const src = path.join(__dirname, "/../src/Graphql/types");
    const build = path.join(__dirname, "/../build/src/Graphql/types");
    shell(`mkdir -p ${build}`);
    shell(`cp -r ${src}/* ${build}`);
    //console.log(`From\t: ${src}`);
    //console.log(`To\t: ${build}\n`);
}
// Copy file Graphql TypeDef into Build(dist) folder in Prod Env
function copyFileDefInProd() {
    const shell = require("child_process").execSync;
    let src = path.join(__dirname, "/../src/Graphql/types");
    let build = path.join(__dirname, "../build/src/Graphql/types");
    shell(`mkdir -p ${build}`);
    shell(`cp -r ${src}/* ${build}`);
    //console.log(`\nFrom\t: ${src}`);
    //console.log(`To\t: ${build}\n`);
    src = path.join(__dirname, "/../sslcert");
    build = path.join(__dirname, "../build/sslcert");
    shell(`mkdir -p ${build}`);
    shell(`cp -r ${src}/* ${build}`);
    //console.log(`From\t: ${src}`);
    //console.log(`To\t: ${build}\n`);
}


