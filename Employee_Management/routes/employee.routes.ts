import express from "express";
import {
  deleteEmployee,
  getEmployee,
  getEmployeeById,
  postEmployee,
  updateEmployee,
} from "../controllers/employee.controller";

const router = express.Router();

router.route("/").get(getEmployee).post(postEmployee);
router
  .route("/:id")
  .get(getEmployeeById)
  .delete(deleteEmployee)
  .put(updateEmployee);

export default router;
