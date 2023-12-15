import express, { Request, Response } from "express";
import mongoose from "mongoose";
import connect from "./utils/connect";
import { strongPasswordChecker } from "./utils/strongPasswordChecker";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const dataSchema = new mongoose.Schema({
  data: String,
  result: Number,
});

const Data = mongoose.model("Data", dataSchema);

app.post("/api/save", async (req: Request, res: Response) => {
  const result = strongPasswordChecker(req.body.data);
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
  await connect();
  console.log(`Server is running on port ${PORT}`);
});
