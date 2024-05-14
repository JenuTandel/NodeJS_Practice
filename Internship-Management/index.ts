import express from "express";
import InternshipBatchRoutes from "./routes/internshipBatch.routes";
import DomainRoutes from "./routes/domains.routes";
import DesignationRoutes from "./routes/designations.routes";
import MentorsRoutes from "./routes/mentors.routes";
import RoadmapRoutes from "./routes/roadmaps.routes";
import cors from "cors";

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  //   app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/internshipBatch/", InternshipBatchRoutes);
app.use("/api/v1/domains/", DomainRoutes);
app.use("/api/v1/designations/", DesignationRoutes);
app.use("/api/v1/mentors/", MentorsRoutes);
app.use("/api/v1/roadmaps/", RoadmapRoutes);

export default app;
