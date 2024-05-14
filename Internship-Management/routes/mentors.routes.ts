import express from "express";
import {
  deleteMentor,
  getMentor,
  getMentors,
  postMentor,
  updateMentor,
} from "../controllers/mentors.controller";

const router = express.Router();

router.route("/").get(getMentors).post(postMentor);
router.route("/:id").get(getMentor).patch(updateMentor).delete(deleteMentor);

export default router;
