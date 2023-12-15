"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    const dbUri = "mongodb://notadmin:notpassword@localhost:27017";
    try {
        await mongoose_1.default.connect(dbUri);
        console.log("Connected to the DB");
    }
    catch (error) {
        console.error("error connecting to the database");
        process.exit(1);
    }
};
exports.default = connect;
