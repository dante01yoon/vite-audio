var express = require("express");
var PORT = 4000;
var app = express();
app.get(PORT, function () {
    console.log("app is running on PORT ".concat(PORT));
});
