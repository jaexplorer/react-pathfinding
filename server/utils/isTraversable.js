const isTraversable = (maze, node) => {
  return (
    node.y >= 0 &&
    node.y < maze.length &&
    node.x >= 0 &&
    node.x < maze[0].length &&
    maze[node.y][node.x].type !== "Wall"
  );
};

export default isTraversable;
