const express = require("express");
const router = express.Router();

// DFS Endpoint
router.post("/", (req, res) => {
  let maze = req.body.maze;
  let start = req.body.start;
  let path = [];

  maze[start.y][start.x] = "Visited"; // TODO: Need to do a check if start === end
  path.push(start);

  const hasPathToEnd = node => {
    const shifts = [
      { y: -1, x: 0 }, // Going Up
      { y: 0, x: 1 }, // Going Right
      { y: 1, x: 0 }, // Going Down
      { y: 0, x: -1 } // Going Left
    ];

    for (const shift of shifts) {
      let next = { y: node.y + shift.y, x: node.x + shift.x };

      if (
        next.y >= 0 &&
        next.y < maze.length &&
        next.x >= 0 &&
        next.x < maze[0].length &&
        (maze[next.y][next.x] === "Empty" || maze[next.y][next.x] === "Goal")
      ) {
        if (maze[next.y][next.x] === "Goal") {
          path.push(next);
          return true;
        }
        maze[next.y][next.x] = "Visited";
        path.push(next);

        if (hasPathToEnd(next)) {
          return true;
        }

        path.pop();
      }
    }

    return false;
  };

  // DFS
  if (!hasPathToEnd(req.body.start)) {
    path.pop();
    console.log("FAIL");
  }

  res.send(path);
});

module.exports = router;
