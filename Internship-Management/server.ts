import app from "./index";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const host = "172.16.5.245";
const port = 8080;
app.listen(port, host, () => {
  console.log(`server is running on port ${port} and host ${host}`);
});
