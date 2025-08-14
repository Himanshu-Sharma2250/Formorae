import express from "express";
import dotenv from "dotenv";
import db from "./db/index.js";
dotenv.config({
    path: ".env"
});
const app = express();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Hello");
});
db();
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
