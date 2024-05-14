import { Request, Response } from "express";
import pool from "../server/postgres.server";
import { EnumValues } from 'enum-values';
import { Domains } from "../enums/domains.enum";
import { Designations } from "../enums/designations.enum";

// get all mentors
const getMentors = (req: Request, res: Response) => {
  // const query = `SELECT m.id, m.firstname, m.lastname,m.email, m.phone,d.name AS domains, des.name AS designations FROM mentors m JOIN domains d ON m.domain = d.id JOIN designations des ON m.designation = des.id`;
  pool.query("SELECT * FROM mentors", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    const data = result.rows;
    const updatedRes= data.map((dt)=>({...dt, domain:EnumValues.getNameFromValue(Domains,Number(dt.domain)), designation:EnumValues.getNameFromValue(Designations,Number(dt.designation))}))
    res.status(200).json(updatedRes);
  });
};

// get mentor
const getMentor = (req: Request, res: Response) => {
  const id = req.params.id;
  const query = `SELECT * FROM mentors WHERE id=$1`;
  // const query = `SELECT m.id, m.firstname, m.lastname,m.email, m.phone,d.name AS domains, des.name AS designations FROM mentors m JOIN domains d ON m.domain = d.id JOIN designations des ON m.designation = des.id WHERE m.id=$1`;
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
    const data = result.rows;
    const updatedRes= data.map((dt)=>({...dt, domain:EnumValues.getNameFromValue(Domains,Number(dt.domain)), designation:EnumValues.getNameFromValue(Designations,Number(dt.designation))}))
    res.status(200).json(updatedRes);
  });
};

//create new mentor
const postMentor = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, phone, domain, designation } = req.body;
    const query = `INSERT INTO mentors ("firstname","lastname","email","phone","domain","designation") VALUES ($1,$2,$3,$4,$5,$6)`;
    const values = [firstname, lastname, email, phone, Domains[domain], Designations[designation]];
    await pool.query(query, values);
    res.status(201).json({ message: "Mentors data inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error inserting mentors data" });
  }
};

// update mentors data
const updateMentor = (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname, email, phone, domain, designation } = req.body;
  const query = `UPDATE mentors SET "firstname"=COALESCE($1, "firstname"), "lastname"=COALESCE($2, "lastname"), "email"=COALESCE($3, "email"), "phone"=COALESCE($4, "phone"), "domain"=COALESCE($5, "domain"), "designation"=COALESCE($6, "designation") WHERE "id"=$7`;
  const values = [firstname, lastname, email, phone, Domains[domain], Designations[designation], id];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error updating mentors data" });
    }
    res.status(200).json({ message: "Mentor data updated successfully" });
  });
};

// const updateMentor = (req: Request, res: Response) => {
//   const id = req.params.id;
//   const { firstname, lastname, email, phone, domain, designation } = req.body;

//   // Query the domain table to find the ID corresponding to the provided domain name
//   const domainQuery = `SELECT id FROM domains WHERE name = $1`;
//   pool.query(domainQuery, [domain], (domainErr, domainResult) => {
//     if (domainErr) {
//       console.error("Error querying domain:", domainErr);
//       return res.status(500).json({ message: "Error updating mentor data" });
//     }
//     const domainId = domainResult.rows[0]?.id;
//     console.log(domainId);

//     // Query the designation table to find the ID corresponding to the provided designation name
//     const designationQuery = `SELECT id FROM designations WHERE name = $1`;
//     pool.query(
//       designationQuery,
//       [designation],
//       (designationErr, designationResult) => {
//         if (designationErr) {
//           console.error("Error querying designation:", designationErr);
//           return res
//             .status(500)
//             .json({ message: "Error updating mentor data" });
//         }
//         const designationId = designationResult.rows[0]?.id;
//         console.log(designationId);

//         // Update the mentor's record with the obtained domain and designation IDs
//         const query = `UPDATE mentors SET "firstname"=COALESCE($1, "firstname"), "lastname"=COALESCE($2, "lastname"), "email"=COALESCE($3, "email"), "phone"=COALESCE($4, "phone"), "domain"=COALESCE($5, "domain"), "designation"=COALESCE($6, "designation") WHERE "id"=$7`;
//         const values = [
//           firstname,
//           lastname,
//           email,
//           phone,
//           domainId,
//           designationId,
//           id,
//         ];
//         pool.query(query, values, (updateErr, updateResult) => {
//           if (updateErr) {
//             console.error("Error executing query:", updateErr);
//             return res
//               .status(500)
//               .json({ message: "Error updating mentor data" });
//           }
//           res.status(200).json({ message: "Mentor data updated successfully" });
//         });
//       }
//     );
//   });
// };

// delete mentor data
const deleteMentor = (req: Request, res: Response) => {
  const id = req.params.id;
  const query = `DELETE FROM mentors WHERE id=$1`;
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
      message: "Mentors data deleted successfully",
    });
  });
};

export { getMentors, getMentor, postMentor, updateMentor, deleteMentor };
