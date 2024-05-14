import express from "express";
import { getDesignations } from "../controllers/designations.controller";

const router = express.Router();

router.route("/").get(getDesignations);

export default router;
