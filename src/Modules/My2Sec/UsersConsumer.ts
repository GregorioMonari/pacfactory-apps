const Consumer= require("pacfactory").Consumer
class UsersConsumer extends Consumer{
    constructor(jsap:any){
        super(jsap,"ALL_USERS")
    }
}