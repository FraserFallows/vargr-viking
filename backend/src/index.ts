import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import eventsRouter from "./routes/events";
import contactRouter from "./routes/contact";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
})

app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/contact", contactRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})