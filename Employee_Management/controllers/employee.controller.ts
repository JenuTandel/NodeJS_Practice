import { Request, Response, query } from "express";
import pool from "../server/postgres.server";
import { IEmployeeReq, IEmployeeRes, IReqId } from "../models/employee.model";

// get all employees
const getEmployee = (req: Request<void>, res: Response<IEmployeeRes>) => {
  pool.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  });
};

// get employee by ID
const getEmployeeById = (req: Request<IReqId>, res: Response<IEmployeeRes>) => {
  const id = req.params.id;
  const query = `SELECT employees.id, employees.name, employees.email_id,designations.name as designation from employees inner join designations on employees.designation_id = designations.id WHERE employees.id = $1`;
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({
        status: "error",
        message: "Error executing query",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  });
};

// create an employee
const postEmployee = async (
  req: Request<IEmployeeReq>,
  res: Response<IEmployeeRes>
) => {
  try {
    const { name, emailId } = req.body;
    const query = `INSERT INTO employees ("name", "emailId") VALUES ($1, $2)`;
    const values = [name, emailId];
    await pool.query(query, values);

    res.status(201).json({ message: "Employee data inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting employee data" });
  }
};

// delete an employee
const deleteEmployee = (req: Request<IReqId>, res: Response) => {
  const id = req.params.id;
  const query = `DELETE FROM employees WHERE id=$1`;
  if (id) {
    pool.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error executing query", err);
      }
      res.status(201).json({
        status: "success",
        message: "Employee data deleted successfully ",
      });
    });
  }
};

//update an employee details
const updateEmployee = (req: Request<IReqId>, res: Response) => {
  const id = req.params.id;
  console.log(req.body);

  const { name, emailId } = req.body;

  const query = `UPDATE employees SET "name" = $1, "emailId" = $2 WHERE "id" = $3`;
  const values = [name, emailId, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error updating employee data" });
    }
    res.status(200).json({ message: "Employee data updated successfully" });
  });
};

export {
  getEmployee,
  postEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
};
