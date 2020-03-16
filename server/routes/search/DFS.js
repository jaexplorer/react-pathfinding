import express from "express";
const router = express.Router();
import directions from "../../utils/directions";
import isTraversable from "../../utils/isTraversable";

// DFS Endpoint
router.post("/", (req, res) => {
  let maze = req.body.maze;
  let start = req.body.start;
  let path = [];

  maze[start.y][start.x].visited = true;
  path.push(start);

  const hasPathToEnd = node => {
    for (const direction of directions) {
      let next = {
        y: node.y + direction.y,
        x: node.x + direction.x,
        direction: direction.direction
      };

      if (isTraversable(maze, next)) {
        if (maze[next.y][next.x].visited === true) {
          continue;
        }
        if (maze[next.y][next.x].type === "Goal") {
          path.push(next);
          return true;
        }
        maze[next.y][next.x].visited = true;
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
  }

  res.send({
    path: path,
    method: "Depth First Search",
    nodes: maze.length * maze[0].length
  });
});

export default router;
