import isTraversable from "./isTraversable";
import directions from "./directions";

const calculateCosts = (maze, goals, start) => {
  let tempArray = maze;

  const calculateCost = (y, x, type) => {
    let path = [];
    tempArray[y][x].visited = true;
    path.push({ y, x });

    var i = 1;

    while (path.length) {
      let currNode = path.shift();
      if (maze[currNode.y][currNode.x].type === "Goal") {
        maze[currNode.y][currNode.x].endCost = 0;
      }
      if (maze[currNode.y][currNode.x].type === "Agent") {
        maze[currNode.y][currNode.x].startCost = 0;
      }
      maze[currNode.y][currNode.x].visited = true;

      for (const direction of directions) {
        let next = { y: currNode.y + direction.y, x: currNode.x + direction.x };

        if (isTraversable(maze, next)) {
          if (maze[next.y][next.x].visited === true) {
            continue;
          }
          next.parent = currNode;
          path.push(next);
          maze[next.y][next.x].visited = true;
          if (type === "start") {
            if (maze[next.y][next.x].type === "Agent") {
              maze[next.y][next.x].startCost = 0;
              continue;
            }
            maze[next.y][next.x].startCost =
              maze[next.y][next.x].startCost < i
                ? maze[next.y][next.x].startCost
                : i;
          }
          if (type === "goal") {
            if (maze[next.y][next.x].type === "Goal") {
              maze[next.y][next.x].endCost = 0;
              continue;
            }
            maze[next.y][next.x].endCost =
              maze[next.y][next.x].endCost < i
                ? maze[next.y][next.x].endCost
                : i;
            // console.log(maze[next.y][next.x]);
          }
        }
      }
      i++;
    }

    // Reset
    for (y = 0; y < tempArray.length; y++) {
      for (x = 0; x < tempArray[0].length; x++) {
        tempArray[y][x].visited = false;
      }
    }
  };

  calculateCost(start.y, start.x, "start");
  goals.forEach(goal => {
    calculateCost(goal.y, goal.x, "goal");
  });
  return tempArray;
};

export default calculateCosts;
