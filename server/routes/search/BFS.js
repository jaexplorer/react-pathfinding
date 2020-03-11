const express = require("express");
const router = express.Router();

// BFS Endpoint
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

      for (const shift of shifts) {
        let next = { y: currNode.y + shift.y, x: currNode.x + shift.x };

        if (
          next.y >= 0 &&
          next.y < maze.length &&
          next.x >= 0 &&
          next.x < maze[0].length &&
          maze[next.y][next.x].visited === true
        ) {
          continue;
        } else if (
          next.y >= 0 &&
          next.y < maze.length &&
          next.x >= 0 &&
          next.x < maze[0].length &&
          (maze[next.y][next.x].type === "Empty" ||
            maze[next.y][next.x].type === "Goal")
        ) {
          if (maze[next.y][next.x].type === "Goal") {
            next.parent = currNode;
            path = [{ y: next.y, x: next.x }];
            while (next.parent) {
              next = next.parent;
              path.push({ y: next.y, x: next.x });
            }
            path.reverse();
            return true;
          }
          next.parent = currNode;
          path.push(next);
          maze[next.y][next.x].visited = true;
        }
      }
    }
  };
  hasPathToEnd();

  res.send(path);
});

module.exports = router;
