import express from "express";
import authRoutes from "./routes/auth-routes";
import clientRoutes from "./routes/client-routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/client", clientRoutes);

export default app;
