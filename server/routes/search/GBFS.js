const express = require("express");
const router = express.Router();

// GBFS Endpoint
router.post("/", (req, res) => {
  let maze = req.body.maze;
  let start = req.body.start;
  let path = [];

  maze[start.y][start.x].visited = true; // TODO: Need to do a check if start === end
  path.push(start);

  const hasPathToEnd = () => {
    const shifts = [
      { y: -1, x: 0 }, // Going Up
      { y: 0, x: 1 }, // Going Right
      { y: 1, x: 0 }, // Going Down
      { y: 0, x: -1 } // Going Left
    ];

    while (path.length) {
      let currNode = path.shift();
      maze[currNode.y][currNode.x].visited = true;

      neighbours = [];
      for (const shift of shifts) {
        if (
          currNode.y + shift.y >= 0 &&
          currNode.y + shift.y < maze.length &&
          currNode.x + shift.x >= 0 &&
          currNode.x + shift.x < maze[0].length &&
          maze[currNode.y + shift.y][currNode.x + shift.x].visited === true
        ) {
          continue;
        } else if (
          currNode.y + shift.y >= 0 &&
          currNode.y + shift.y < maze.length &&
          currNode.x + shift.x >= 0 &&
          currNode.x + shift.x < maze[0].length &&
          (maze[currNode.y + shift.y][currNode.x + shift.x].type === "Empty" ||
            maze[currNode.y + shift.y][currNode.x + shift.x].type === "Goal")
        ) {
          try {
            neighbours.push({
              y: currNode.y + shift.y,
              x: currNode.x + shift.x,
              endCost: maze[currNode.y + shift.y][currNode.x + shift.x].endCost
            });
          } catch (err) {}
        }
      }

      neighbours.sort((a, b) => a.endCost - b.endCost);

      if (maze[neighbours[0].y][neighbours[0].x].type === "Goal") {
        neighbours[0].parent = currNode;
        path = [{ y: neighbours[0].y, x: neighbours[0].x }];
        while (neighbours[0].parent) {
          neighbours[0] = neighbours[0].parent;
          path.push({ y: neighbours[0].y, x: neighbours[0].x });
        }
        path.reverse();
        return true;
      }

      neighbours[0].parent = currNode;
      path.push(neighbours[0]);
      maze[neighbours[0].y][neighbours[0].x].visited = true;
    }
  };
  hasPathToEnd();

  res.send(path);
});

module.exports = router;
