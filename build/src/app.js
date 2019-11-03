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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var http_errors_1 = __importDefault(require("http-errors"));
var indexRouter = __importStar(require("./routes/index"));
var usersRouter = __importStar(require("./routes/users"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var cors_1 = __importDefault(require("cors"));
var indexSchema_1 = require("./Graphql/indexSchema");
var Server = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        // Create a new express application instance
        this.app = express_1.default();
        // configure application
        this.config();
        // configure routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        console.log("bootstrap");
        return new Server();
    };
    Server.prototype.config = function () {
        var _this = this;
        // connect to db
        var dbURI = process.env.MONGODB_URL;
        dbURI = "mongodb://adm:35351235@127.0.0.1:27017/XA-Product";
        var statusAutoIndex = true;
        if (process.env.NODE_ENV === "PROD") {
            // dbURI = process.env.MONGODB_P_URL;
            dbURI = "mongodb+srv://CRUD:113355135@xa-product-dvtj7.mongodb.net/XA-Product?retryWrites=true&w=majority";
            statusAutoIndex = false;
        }
        this.app.get("/", function (req, res, next) {
            // console.log("get");
            res.send("\n            <h1> Welcome to Express with TS </h1>\n            <h2> Hosted by Heroku </h2>\n            <a href = \"/graphql-retrieve\" style = \"text-decoration:none; color: #33334d\" > Click to come to GraphiQL </a>\n            ");
        });
        mongoose_1.default.connect(Object(dbURI).toString(), {
            useNewUrlParser: true,
            useCreateIndex: statusAutoIndex,
            autoIndex: statusAutoIndex,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }, function (err) {
            // console.log(mongoose.connections);
            console.log("Connected into DB: " + dbURI);
        }).catch(function (error) {
            console.log("Error occured");
            console.log(error);
        });
        // view engine setup
        // this.app.set("views", path.join(__dirname, "views"));
        // this.app.set("view engine", "jade");
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
        // favicon
        // this.app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            // console.clear();
            console.log(req.path);
            // Exception for checking GraphQL using GraphiQL
            if (req.path.includes("/graphql-retrieve")) {
                next();
            }
            else if (req.path.includes("/favicon.ico")) {
                _this.app.get('/favicon.ico', function (req, res) { return res.status(204); });
                next();
            }
            else {
                res.send("\n                    < h1 > Error - 404 < /h1>\n                    < h2 > Page Not Found < /h2>\n\n                        ");
                next(http_errors_1.default(404));
            }
        });
        // error handler
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "DEV" ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
        // /////////////////////////////
        // /* Instlal GraphQL Modules and Dependencies */
        // var corsOptions = {
        //   origin: 'http://localhost:4200',
        //   credentials: true // <-- REQUIRED backend setting
        // // };
        this.app.use("*", cors_1.default());
        this.app.use("/graphql-retrieve", express_graphql_1.default({
            schema: indexSchema_1.schema(),
            rootValue: global,
            graphiql: true,
            context: function (_a) {
                var req = _a.req, connection = _a.connection;
                return __awaiter(_this, void 0, void 0, function () {
                    var token;
                    return __generator(this, function (_b) {
                        if (connection) {
                            // Check connection for metadata
                            return [2 /*return*/, connection.context];
                        }
                        else {
                            token = req.headers.authorization || "";
                            return [2 /*return*/, { token: token }];
                        }
                        return [2 /*return*/];
                    });
                });
            }
        }));
    };
    Server.prototype.routes = function () {
        this.app.use("/", indexRouter.router);
        this.app.use("/users", usersRouter.router);
    };
    return Server;
}());
exports.Server = Server;
