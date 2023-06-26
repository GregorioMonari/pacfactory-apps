var log = require("greglogs").default
const PacModule= require("pacfactory").PacModule
const CachedConsumer=require("pacfactory").CachedConsumer
import { ArgumentsParser, PacFactoryConfig } from "./utils/ArgumentsParser";
import { JsapLoader } from "./utils/JsapLoader";
import * as fs from 'fs';
import { UsersConsumerTester } from "./Apps/My2Sec/UsersConsumerTester";

const moduleObj=importApps()
console.log(moduleObj)


//LA PATH DEI MODULI E' DIVERSA DALLA PATH DI FS
function importApps(){
    var moduleObj: any={}
    const _root="./src"
    const _appsDir=_root+"/Apps"
    const modules=fs.readdirSync(_appsDir);
    log.debug("Importing "+modules.length+" apps:",modules)
    for(const appName of modules){
        const appDir=_appsDir+"/"+appName
        const appModules=fs.readdirSync(appDir);
        log.debug("Importing "+appModules.length+" modules from: "+appName)
        for(const app_module of appModules){
            const parsed_app_module=app_module.split(".ts")[0]
            const modulePath="./Apps/"+appName+"/"+parsed_app_module
            console.log(modulePath)
            moduleObj[appName+"/"+parsed_app_module]=require(modulePath)[parsed_app_module]
        }
    }

    return moduleObj
}


main()

async function main(){

    console.log("- PACFACTORY -")

    const _argumentsParser= new ArgumentsParser();
    const _jsapLoader= new JsapLoader();

    const commandArguments: string[] = process.argv.slice(2);
    const config: PacFactoryConfig = _argumentsParser.parseArguments(commandArguments)
    log.debug("PacFactory config:",config)
    const jsap = _jsapLoader.getJsap(config.jsapPath);
    log.trace("Jsap:",jsap)

    if(config.appName==null){
        showHelp()
    }else{
        startPacModule(jsap,config)
    }
}



async function startPacModule(jsap: object,config: PacFactoryConfig): Promise<void>{
    /*let pac= new CachedConsumer(jsap,"ALL_USERNAMES",{},false);
    //let pac= new PacModule(jsap);
    pac.subscribeToSepa()*/
    if(config.appName!=null){
        console.log(config.appName)
        //console.log(moduleObj)
        const ClassName= moduleObj[config.appName]
        //console.log(ClassName)
        var pacmodule=new ClassName(jsap)
        pacmodule.start()
    }
}



async function showHelp(){
    console.log(`HELP`)
}

