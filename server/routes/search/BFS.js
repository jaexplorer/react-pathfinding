import express from "express";
const router = express.Router();
import directions from "../../utils/directions";
import isTraversable from "../../utils/isTraversable";
import backtrace from "../../utils/backtrace";

// BFS Endpoint
router.post("/", (req, res) => {
  let maze = req.body.maze;
  let start = req.body.start;
  let path = [];

  maze[start.y][start.x].visited = true;
  path.push(start);

  const hasPathToEnd = () => {
    while (path.length) {
      let currNode = path.shift();
      maze[currNode.y][currNode.x].visited = true;

      for (const direction of directions) {
        let next = {
          y: currNode.y + direction.y,
          x: currNode.x + direction.x,
          direction: direction.direction
        };

        if (isTraversable(maze, next)) {
          if (maze[next.y][next.x].visited === true) {
            continue;
          }
          if (maze[next.y][next.x].type === "Goal") {
            path = backtrace(next, currNode);
            return true;
          }
          next.parent = currNode;
          path.push(next);
          maze[next.y][next.x].visited = true;
        }
      }
    }
  };
  if (!hasPathToEnd()) {
    path.pop();
  }

  res.send({
    path: path,
    method: "Breadth First Search",
    nodes: maze.length * maze[0].length
  });
});

export default router;
