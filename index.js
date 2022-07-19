require('dotenv').config();
const express = require('express');
const stories = require('./routes/storyRoutes');
const users = require('./routes/userRoutes');
//const db = require('./models/dbconnect');
const db = require('./config/dbconfig');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
//const winston = require("winston/lib/winston/config");
const app = express();

//db.sequelize.sync();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

db();
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
