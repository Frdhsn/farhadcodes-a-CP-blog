const express = require("express");
//const fs = require("fs");
const app = express();
app.use(express.json());
const db = require("./models/dbconnect");
db.sequelize.sync();
//console.log("The table for the User model was just (re)created!");
require("./routes/storyRoutes")(app);
require("./routes/userRoutes")(app);
//const stories = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tempdata.json`));
const port = 3005;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
