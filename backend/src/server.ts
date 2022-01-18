const express = require("express");

const PORT = 4000;

const app = express();

app.get("/", () => {
  console.log("request has been made to '/'")
})

app.listen(PORT,() => {
  console.log(`app is running on PORT ${PORT}`)
} )