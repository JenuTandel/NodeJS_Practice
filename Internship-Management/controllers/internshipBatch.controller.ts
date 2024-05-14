import {
  IInternshipBatchReq,
  IInternshipBatchRes,
  IReqId,
} from "../models/internship.model";
import { Request, Response } from "express";
import pool from "../server/postgres.server";

// get all internship batches
const getInternshipBatches = (
  req: Request,
  res: Response
) => {
  pool.query("SELECT * FROM internship_batch", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    res.status(200).json(result.rows);
  });
};

//create new internship batch
const postInternshipBatch = async (
  req: Request,
  res: Response
) => {
  try {
    const { batchname, startdate, enddate, status } = req.body;
    const query = `INSERT INTO internship_batch ("batchname","startdate","enddate","status") VALUES ($1,$2,$3,$4)`;
    const values = [batchname, startdate, enddate, status];
    await pool.query(query, values);
    res
      .status(201)
      .json({ message: "Internship batch data inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting internship batch data" });
  }
};
const getInternshipBatch = (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const query = `SELECT * FROM internship_batch WHERE id=$1`;
  const values = [id];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({
        status: "error",
        message: "Error executing query",
      });
      return;
    }
    res.status(200).json(result.rows[0]);
  });
};
const updateInternshipBatch = (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const { batchname, startdate, enddate, status } = req.body;
  const query = `UPDATE internship_batch SET "batchname"=$1, "startdate"=$2, "enddate"=$3, "status"=$4 WHERE "id"=$5`;
  const values = [batchname, startdate, enddate, status, id];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "Error updating internship batch data" });
    }
    res
      .status(200)
      .json({ message: "Internship batch data updated successfully" });
  });
};
const deleteInternshipBatch = (req: Request<IReqId>, res: Response) => {
  const id = req.params.id;
  const query = `DELETE FROM internship_batch WHERE id=$1`;
  const values = [id];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({
        status: "error",
        message: "Error executing query",
      });
      return;
    }
    res.status(201).json({
      status: "success",
      message: "Internship batch data deleted successfully",
    });
  });
};

export {
  getInternshipBatches,
  getInternshipBatch,
  postInternshipBatch,
  updateInternshipBatch,
  deleteInternshipBatch,
};
