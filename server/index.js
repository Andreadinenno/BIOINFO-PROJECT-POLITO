const express = require("express"); //import express library
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");

const app = express(); //create an express application

app.use(bodyParser.json()); //body parser for incoming request as stripe

require("./routes/requestRoute.js")(app); //will call immediately the route file function passing app as argument

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets -> main.js, main.css
  app.use(express.static("client/build"));

  //express will serve up index.html file if it doesn't recognize the route
  //if we are here it means that all previous route handlers didn't get the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//get runtime configuration of port which will be specified by heroku , default 5000
const PORT = process.env.PORT || 5000;
//node will listen to port 5000
app.listen(PORT);
