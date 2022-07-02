const express = require("express");
const { json } = require("express");
const flights = require("./controllers/todoController");
const models = require("./models/todo");
const routes = require("./routes/todoRoute");
const cors = require('cors');
var mongoose = require('mongoose');
require('dotenv/config');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}, () => { console.log('connected to DB'); });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(port, () => console.log(`listening on port!`));