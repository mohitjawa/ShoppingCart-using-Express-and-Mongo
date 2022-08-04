const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/route");
require("dotenv").config();
require("./db/conn");

app.use(bodyParser.json({ limit: "500mb" }));
//parsing-req.body-urlQueries-into-query-string
app.use(bodyParser.urlencoded({ limit: "500mb", extended: false }));

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
