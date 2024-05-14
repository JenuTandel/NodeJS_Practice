import express from "express";
import { getDomains } from "../controllers/domains.controller";

const router = express.Router();

router.route("/").get(getDomains);

export default router;
