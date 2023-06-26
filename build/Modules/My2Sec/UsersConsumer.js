"use strict";
const Consumer = require("pacfactory").Consumer;
class UsersConsumer extends Consumer {
    constructor(jsap) {
        super(jsap, "ALL_USERS");
    }
}
