const express = require("express");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');

// Create an Express application
const app = express();

app.use(expressLayouts);
app.set("layout", path.join(__dirname, "views", "layouts", "application.ejs"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Define a route to serve the HTML file
app.get(/\//, (req, res) => {
  res.render("app");
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
