import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const db_uri: any = process.env.MONGODB_URI;

const db = () => {
    mongoose.connect(db_uri)
        .then(() => {
            console.log("connect to database")
        })
        .catch((err) => {
            console.error("Error connecting database: ", err);
            process.exit(1)
        })
}

export default db;