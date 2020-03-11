module.exports = (maze, goals, start) => {
  tempArray = maze;

  const calculateCost = (y, x, type) => {
    let path = [];
    const shifts = [
      { y: -1, x: 0 }, // Going Up
      { y: 0, x: 1 }, // Going Right
      { y: 1, x: 0 }, // Going Down
      { y: 0, x: -1 } // Going Left
    ];
    tempArray[y][x].visited = true;
    path.push({ y, x });

    var i = 1;

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
            maze[next.y][next.x].type === "Goal" ||
            maze[next.y][next.x].type === "Agent")
        ) {
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
    calculateCost(goal.goalY, goal.goalX, "goal");
  });
  return tempArray;
};
