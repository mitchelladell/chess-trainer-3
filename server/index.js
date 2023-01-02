const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/pgn", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Read the PGN file
  const pgn = fs.readFileSync(
    __dirname + "/public/Shanklands-Chess-Calculation-Workbook.pgn",
    "utf8"
  );

  // Send the PGN file as the response
  res.send(pgn);
});
