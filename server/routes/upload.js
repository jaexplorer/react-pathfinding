import express from "express";
const router = express.Router();
import fs from "fs";

// Upload Endpoint
router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Grab text file from request
  const myFile = req.files.file;

  // Save the text file
  myFile.mv(`${__dirname}/../uploads/${myFile.name}`, async err => {
    if (err) {
      console.log(err, "HERE1");
      return res.status(500).send(err);
    }

    // Read in lines from text file
    try {
      const lines = await fs
        .readFileSync(`${__dirname}/../uploads/${myFile.name}`, "utf-8")
        .split(/\r?\n/);

      // Grab Agent's X and Y coordinates
      const agentX = parseInt(lines[1].replace(/[\(\)']+/g, "").split(",")[0]);
      const agentY = parseInt(lines[1].replace(/[\(\)']+/g, "").split(",")[1]);

      // Grab Goal's X and Y coordinates
      const goals = lines[2].split("|");
      goals.forEach((goal, index) => {
        let goalX = parseInt(goal.replace(/[\(\)']+/g, "").split(",")[0]);
        let goalY = parseInt(goal.replace(/[\(\)']+/g, "").split(",")[1]);
        goals[index] = { y: goalY, x: goalX };
      });

      // Construct Map and fill with empty nodes
      const rows = parseInt(lines[0].replace(/[\[\]']+/g, "").split(",")[0]);
      const columns = parseInt(lines[0].replace(/[\[\]']+/g, "").split(",")[1]);
      var myArray = [];

      for (var y = 0; y < rows; y++) {
        myArray[y] = [];
        for (var x = 0; x < columns; x++) {
          myArray[y][x] = {
            type: "Empty",
            visited: false,
            x: x,
            y: y,
            parent: null
          };
        }
      }

      // Place Agent on map
      myArray[agentY][agentX].type = "Agent";

      // Place Goals on map
      goals.forEach(goal => {
        myArray[goal.y][goal.x].type = "Goal";
      });

      // Place Walls (Gaps) on map
      lines.slice(3).forEach(wall => {
        let wallX = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[0]);
        let wallY = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[1]);
        let wallWidth = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[2]);
        let wallHeight = parseInt(wall.replace(/[\(\)']+/g, "").split(",")[3]);

        for (var w = 0; w < wallWidth; w++) {
          for (var h = 0; h < wallHeight; h++) {
            myArray[wallY + h][wallX + w].type = "Wall";
          }
        }
      });

      // Send back the constructed maze
      res.send({
        maze: myArray,
        start: { y: agentY, x: agentX },
        filename: myFile.name
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send(
          "Had some trouble reading the file, please make sure its in the right format"
        );
    }
  });
});

export default router;
