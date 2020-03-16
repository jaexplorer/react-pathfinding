const fetchGoals = maze => {
  let goals = [];

  for (var y = 0; y < maze.length; y++) {
    for (var x = 0; x < maze[0].length; x++) {
      if (maze[y][x].type === "Goal") {
        goals.push(maze[y][x]);
      }
    }
  }
  return goals;
};

export default fetchGoals;
