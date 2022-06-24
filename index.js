require('dotenv').config();
const express = require('express');
const stories = require('./routes/storyRoutes');
const users = require('./routes/userRoutes');
const db = require('./models/dbconnect');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
//const winston = require("winston/lib/winston/config");
const app = express();
db.sequelize.sync();

app.use(express.json());

app.use('/api/v1/stories', stories);
app.use('/api/v1/users', users);

// unhandled requests
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});
app.use(globalErrorHandler);

const port = 3005;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
