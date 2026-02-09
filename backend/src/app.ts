import express from "express";
import healthRoute from "./routes/health";

const app = express();
app.use(express.json());
app.use("/api", healthRoute);

export default app;
