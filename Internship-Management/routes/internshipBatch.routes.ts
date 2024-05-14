import express from "express";
import {
  deleteInternshipBatch,
  getInternshipBatch,
  getInternshipBatches,
  postInternshipBatch,
  updateInternshipBatch,
} from "../controllers/internshipBatch.controller";

const router = express.Router();

router.route("/").get(getInternshipBatches).post(postInternshipBatch);
router
  .route("/:id")
  .get(getInternshipBatch)
  .patch(updateInternshipBatch)
  .delete(deleteInternshipBatch);

export default router;
