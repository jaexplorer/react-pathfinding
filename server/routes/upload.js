const express = require("express");
const router = express.Router();
const fs = require("fs");

// Upload Endpoint
router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const myFile = req.files.file;

  myFile.mv(`${__dirname}/../uploads/${myFile.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const lines = fs
      .readFileSync(`${__dirname}/../uploads/${myFile.name}`, "utf-8")
      .split(/\r?\n/);

    // Construct Map
    const rows = parseInt(lines[0].replace(/[\[\]']+/g, "").split(",")[0]);
    const columns = parseInt(lines[0].replace(/[\[\]']+/g, "").split(",")[1]);
    let myArray = Array(rows)
      .fill()
      .map(() => Array(columns).fill("Empty"));

    // Place Agent
    const agentX = parseInt(lines[1].replace(/[\(\)']+/g, "").split(",")[0]);
    const agentY = parseInt(lines[1].replace(/[\(\)']+/g, "").split(",")[1]);
    myArray[agentY][agentX] = "Agent";

    // Place Goals
    const goals = lines[2].split("|");
    goals.forEach(goal => {
      let goalX = parseInt(goal.replace(/[\(\)']+/g, "").split(",")[0]);
      let goalY = parseInt(goal.replace(/[\(\)']+/g, "").split(",")[1]);
      myArray[goalY][goalX] = "Goal";
    });

    // Place Walls
    lines.slice(3).forEach(wall => {
      let wallX = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[0]);
      let wallY = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[1]);
      let wallWidth = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[2]);
      let wallHeight = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[3]);

      for (var w = 0; w < wallWidth; w++) {
        for (var h = 0; h < wallHeight; h++) {
          myArray[wallY + h][wallX + w] = "Wall";
        }
      }
    });

    res.send({ maze: myArray, start: { y: agentY, x: agentX } });
  });
});

module.exports = router;
