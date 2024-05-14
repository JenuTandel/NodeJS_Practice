import express from "express";
import employeeRoute from "./routes/employee.routes";
import morgan from "morgan";
const app = express();

if (process.env.NODE_ENV === "development") {
  //   app.use(morgan("dev"));
}
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Hello from the middleware");
//   next();
// });
app.use("/api/v1/employees", employeeRoute);

export default app;
