import * as express from "express";
import { Request, Response, NextFunction } from "express";
import Route from "./route/index";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { UserModel } from "./db/users";


const app = express();
const port = 3000;
var cors = require("cors")
mongoose.Promise = Promise;
const MONGO_URL =
  "mongodb+srv://testpermata:testpermata@cluster0.0lquyx0.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api/v1", Route);
app.get("/", (req: Request, res: Response) => {
  res.send("hell");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// mongoose.connect(MONGO_URL, {
// });
// (() => console.log("MongoDB Connected..."))

// mongoose.connection.on("error", (error: Error) => console.log(error));
