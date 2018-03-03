var express = require("express");

var app = express();

// Create link to Angular build directory
app.use(express.static(__dirname + "/front/dist/"));

// node server running =========================================================
app.listen(8080);
