const express = require("express");
//const fs = require("fs");
const app = express();
app.use(express.json());
const db = require("./models/dbconnect");
db.sequelize.sync();
//console.log("The table for the User model was just (re)created!");
const st = require("./routes/storyRoutes");
const us = require("./routes/userRoutes");
//const stories = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tempdata.json`));

app.use("/api/v1/stories", st.storyrouter);
app.use("/api/v1/stories", us.userrouter);

const port = 3005;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
