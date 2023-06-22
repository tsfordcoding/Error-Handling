const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

// saySomething callback function
const saySomething = (req, res) => {
    const greeting = req.params.greeting;
    const name = req.query.name;

    const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
    res.send(content);
};

// sayHello callback function
const sayHello = (req, res) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello, ${name}!` : `Hello!`;
    res.send(content);
};

// sayGoodbye callback function
const sayGoodbye = (req, res) => {
    res.send("Sorry to see you go!");
};

// Routes
app.get("/say/goodbye", sayGoodbye);
app.get("/say/:greeting", saySomething);
app.get("/hello", sayHello);

module.exports = app;