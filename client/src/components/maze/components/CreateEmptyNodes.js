import React from "react";

const CreateEmptyNodes = ({ maze, updateMaze, updateDropdown }) => {
  return maze.maze.map((row, rIndex) => {
    return row.map((item, cIndex) => {
      if (item.type === "Empty") {
        return (
          <circle
            key={`empty - ${rIndex},${cIndex}`}
            className='empty'
            onMouseDown={e => {
              if (e.button === 0) {
                let tempMaze = maze.maze;

                if (
                  tempMaze[rIndex][cIndex].type !== "Agent" &&
                  tempMaze[rIndex][cIndex].type !== "Goal"
                ) {
                  tempMaze[rIndex][cIndex].type = "Wall";
                }

                updateMaze({
                  maze: tempMaze,
                  start: maze.start,
                  filename: maze.filename
                });
              } else if (e.button === 2) {
                updateDropdown({
                  clientY: e.clientY,
                  clientX: e.clientX,
                  y: rIndex,
                  x: cIndex
                });
              }
            }}
            cy={`${rIndex * 90 + 50}`}
            cx={`${cIndex * 90 + 50}`}
            r='15'
          />
        );
      } else {
        return null;
      }
    });
  });
};

export default CreateEmptyNodes;
