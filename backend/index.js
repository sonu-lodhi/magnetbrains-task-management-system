const express = require("express");
const cors = require("cors");
const { connection } = require("./Connection/Connection");
const { UserRouter } = require("./Routes/User.Routes");
const { TaskRouter } = require("./Routes/Task.Routes");
const { authentication } = require("./Middleware/Authentication");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/user", UserRouter);

//app.use(authentication);

app.use("/task", TaskRouter);

app.listen(process.env.PORT || 7000, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log("Error in connecting to Database");
    console.log(err);
  }
  console.log(`Listing on PORT ${process.env.PORT}`);
});
