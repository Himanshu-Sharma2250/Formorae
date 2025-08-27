import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import db from "./db/index.js";
import authRouter from "./routes/auth.route.js";
import formRouter from "./routes/form.route.js";
import elementRouter from "./routes/element.route.js";
import ruleRouter from "./routes/rule.route.js";

dotenv.config({
    path: ".env"
})

const app = express();
app.use(cookieParser())
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello")
})

db();

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/forms", formRouter);
app.use("/api/v1/forms", elementRouter);
app.use("/api/v1/forms", ruleRouter);