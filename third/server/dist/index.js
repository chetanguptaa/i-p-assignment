"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_1 = __importDefault(require("./utils/connect"));
const strongPasswordChecker_1 = require("./utils/strongPasswordChecker");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const dataSchema = new mongoose_1.default.Schema({
    data: String,
    result: Number,
});
const Data = mongoose_1.default.model("Data", dataSchema);
app.post("/api/save", async (req, res) => {
    const result = (0, strongPasswordChecker_1.strongPasswordChecker)(req.body.data);
    const newData = new Data({ data: req.body.data, result });
    await newData.save();
    res.status(201).json({
        result: result,
    });
});
app.get("/api/results", async (req, res) => {
    const results = await Data.find();
    res.json(results);
});
app.listen(PORT, async () => {
    await (0, connect_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
