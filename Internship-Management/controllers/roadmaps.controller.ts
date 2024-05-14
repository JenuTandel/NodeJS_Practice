import { Request, Response } from "express";
import pool from "../server/postgres.server";
import { Domains } from "../enums/domains.enum";
import { EnumValues } from "enum-values";
import { Domain } from "domain";

//get Roadmap Details
const getAllRoadmapDetails = (req: Request, res: Response) => {
  const query = "Select * from roadmap";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    const data = result.rows;
    const updatedRes = data.map((dt) => ({ ...dt, domain: EnumValues.getNameFromValue(Domain, Number(dt.domain)) }));
    res.status(200).json(updatedRes);
  });
};

//get particular Roadmap Details
const getRoadmapDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  const query = `Select * from roadmap WHERE id=$1`;
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    const data = result.rows;
    const updatedRes = data.map((dt) => ({ ...dt, domain: EnumValues.getNameFromValue(Domains, Number(dt.domain)) }));
    res.status(200).json(updatedRes[0]);
  });
};

//create new Roadmap
const postRoadmapDetails = async (req: Request, res: Response) => {
  try {
    const { name, domain } = req.body;
    const query = `INSERT INTO roadmap (name, domain, total_duration, total_days, topics) VALUES ($1, $2, 0, 0, ARRAY[]::INTEGER[])`;
    await pool.query(query, [name, Domains[domain]]);
    res.status(201).json({ message: "Roadmap data inserted successfully" });
  } catch (error) {
    console.error("Error inserting roadmap data:", error);
    res.status(500).json({ message: "Error inserting roadmap data" });
  }
};

//update Roadmap Details
const updateRoadmapDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, domain} = req.body;
  const query = `UPDATE roadmaps SET "name"=COALESCE($1,"name"), "domain"=COALESCE($2,"domain") WHERE "id"=$3`;
  const values = [name, Domains[domain], id]
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "Error updating roadmap data" });
    }
    res
      .status(200)
      .json({ message: "roadmap data updated successfully" });
  });
};

//get particular Roadmap Details
const deleteRoadmapDetails = (req: Request, res: Response) => {
  const id = req.params.id;
  const query = `DELETE FROM roadmap WHERE id=$1`;
  pool.query(query, [id], (err, result) => {
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
      message: "roadmap data deleted successfully",
    });
  });
};

export { getAllRoadmapDetails, getRoadmapDetails, postRoadmapDetails, updateRoadmapDetails, deleteRoadmapDetails };
