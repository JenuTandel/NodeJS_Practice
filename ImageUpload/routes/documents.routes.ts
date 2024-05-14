import express from "express";
import {
  getDocumentsData,
  postDocumentsData,
} from "../controllers/document.controller";

const router = express.Router();

router.route("/").get(getDocumentsData).post(postDocumentsData);

export default router;
