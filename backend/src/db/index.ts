import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const db = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("connect to database")
        })
        .catch((err) => {
            console.error("Error connecting database: ", err);
            process.exit(1)
        })
}

export default db;