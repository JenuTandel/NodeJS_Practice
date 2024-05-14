import { Request, Response } from "express";
import { IDomainsRes } from "../models/internship.model";
import pool from "../server/postgres.server";

const getDomains = (req: Request<void>, res: Response) => {
  pool.query("SELECT * FROM domains", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    res.status(200).json(result.rows);
  });
};

export { getDomains };
