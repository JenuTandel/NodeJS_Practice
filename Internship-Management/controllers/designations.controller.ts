import { Request, Response } from "express";
import pool from "../server/postgres.server";

const getDesignations = (req: Request<void>, res: Response) => {
  pool.query("SELECT * FROM designations", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }    
    res.status(200).json(result.rows);
  });
};

export { getDesignations };
