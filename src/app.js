require("dotenv").config();
const path = require("path");
const express = require("express");
const https = require("https");
const temp = require("./utils/temp");

const app = express();

// Define paths to Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup ejs engine and views location
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Archit Tripathi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Archit Tripathi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Any help is given here.",
    title: "Help",
    name: "Archit Tripathi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  temp(req.query.address, (error, { t: temperature, d: desc, name } = {}) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      forecast:
        "The weather is currently " +
        desc +
        ", with " +
        temperature +
        " degrees out.",
      location: name,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "404",
    name: "Archit Tripathi",
    errorText: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    title: "404",
    name: "Archit Tripathi",
    errorText: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
