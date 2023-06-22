const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

// Check for abbreviation length
const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next(`State abbreviation ${abbreviation} is invalid`);
  } else {
    next();
  }
};

// Say Goodbye Route
app.get("/say/goodbye", (req, res) => {
  res.send("Sorry to see you go!");
});

// Say Greeting Route
app.get("/say/:greeting", (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;

  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
  res.send(content);
});

// Hello Route
app.get("/hello", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : `Hello!`;
  res.send(content);
});

// States Abbreviation Route
app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
  }
);

// Travel Abbreviation Route
app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
  }
);

// Not Found Handler
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

module.exports = app;
