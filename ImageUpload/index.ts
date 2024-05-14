import express from "express";
import documentRoute from "./routes/documents.routes";

const app = express();
app.use(express.json());

app.use("/api/v1/documentUpload", documentRoute);

export default app;
