"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("greglogs").default;
const PacModule = require("pacfactory").PacModule;
const CachedConsumer = require("pacfactory").CachedConsumer;
const ArgumentsParser_1 = require("./utils/ArgumentsParser");
const JsapLoader_1 = require("./utils/JsapLoader");
const fs = __importStar(require("fs"));
const moduleObj = importApps();
console.log(moduleObj);
//LA PATH DEI MODULI E' DIVERSA DALLA PATH DI FS
function importApps() {
    var moduleObj = {};
    const _root = "./src";
    const _appsDir = _root + "/Apps";
    const modules = fs.readdirSync(_appsDir);
    log.debug("Importing " + modules.length + " apps:", modules);
    for (const appName of modules) {
        const appDir = _appsDir + "/" + appName;
        const appModules = fs.readdirSync(appDir);
        log.debug("Importing " + appModules.length + " modules from: " + appName);
        for (const app_module of appModules) {
            const parsed_app_module = app_module.split(".ts")[0];
            const modulePath = "./Apps/" + appName + "/" + parsed_app_module;
            console.log(modulePath);
            moduleObj[appName + "/" + parsed_app_module] = require(modulePath)[parsed_app_module];
        }
    }
    return moduleObj;
}
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("- PACFACTORY -");
        const _argumentsParser = new ArgumentsParser_1.ArgumentsParser();
        const _jsapLoader = new JsapLoader_1.JsapLoader();
        const commandArguments = process.argv.slice(2);
        const config = _argumentsParser.parseArguments(commandArguments);
        log.debug("PacFactory config:", config);
        const jsap = _jsapLoader.getJsap(config.jsapPath);
        log.trace("Jsap:", jsap);
        if (config.appName == null) {
            showHelp();
        }
        else {
            startPacModule(jsap, config);
        }
    });
}
function startPacModule(jsap, config) {
    return __awaiter(this, void 0, void 0, function* () {
        /*let pac= new CachedConsumer(jsap,"ALL_USERNAMES",{},false);
        //let pac= new PacModule(jsap);
        pac.subscribeToSepa()*/
        if (config.appName != null) {
            console.log(config.appName);
            //console.log(moduleObj)
            const ClassName = moduleObj[config.appName];
            //console.log(ClassName)
            var pacmodule = new ClassName(jsap);
            pacmodule.start();
        }
    });
}
function showHelp() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`HELP`);
    });
}
