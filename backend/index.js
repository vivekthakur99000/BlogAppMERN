import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { configDotenv } from "dotenv"
import connectDB from "./utils/db.js"

configDotenv({});

const app = express();

// required  middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
  console.log(`server running port ${PORT}`);
});

