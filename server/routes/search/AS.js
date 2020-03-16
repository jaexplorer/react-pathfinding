import express from "express";
const router = express.Router();
import directions from "../../utils/directions";
import isTraversable from "../../utils/isTraversable";
import backtrace from "../../utils/backtrace";
import calculateCosts from "../../utils/calculateCosts";
import fetchGoals from "../../utils/fetchGoals";

// AS Endpoint
router.post("/", (req, res) => {
  let maze = req.body.maze;
  let start = req.body.start;
  let path = [];

  maze = calculateCosts(maze, fetchGoals(maze), start);

  maze[start.y][start.x].visited = true;
  path.push(start);
  try {
    const hasPathToEnd = () => {
      while (path.length) {
        let currNode = path.shift();
        maze[currNode.y][currNode.x].visited = true;

        let neighbours = [];
        for (const direction of directions) {
          let next = {
            y: currNode.y + direction.y,
            x: currNode.x + direction.x
          };
          if (isTraversable(maze, next)) {
            if (maze[next.y][next.x].visited === true) {
              continue;
            }
            neighbours.push({
              y: next.y,
              x: next.x,
              endCost: maze[next.y][next.x].endCost,
              startCost: maze[next.y][next.x].startCost,
              direction: direction.direction
            });
          }
        }

        neighbours.sort(
          // prettier-ignore
          (a, b) => (a.endCost - a.startCost) - (b.endCost - b.startCost)
        );

        if (maze[neighbours[0].y][neighbours[0].x].type === "Goal") {
          path = backtrace(neighbours[0], currNode);
          return true;
        }

        neighbours[0].parent = currNode;
        path.push(neighbours[0]);
        maze[neighbours[0].y][neighbours[0].x].visited = true;
      }
    };
    if (!hasPathToEnd()) {
      path.pop();
    }
  } catch (err) {
    res.send({
      path: path,
      method: "A Star",
      nodes: maze.length * maze[0].length
    });
  }

  res.send({
    path: path,
    method: "A Star",
    nodes: maze.length * maze[0].length
  });
});

export default router;
