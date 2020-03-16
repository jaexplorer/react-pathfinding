import React from "react";

const CreateObjects = ({ maze, updateMaze, updateDropdown }) => {
  return maze.maze.map((row, rIndex) => {
    return row.map((item, cIndex) => {
      if (item.type === "Agent") {
        return (
          <circle
            onMouseDown={e => {
              if (e.button === 2) {
                updateDropdown({
                  clientY: e.clientY,
                  clientX: e.clientX,
                  y: rIndex,
                  x: cIndex
                });
              }
            }}
            key={`agent - ${rIndex},${cIndex}`}
            className='aAgent'
            cy={`${rIndex * 90 + 50}`}
            cx={`${cIndex * 90 + 50}`}
            r='15'
          />
        );
      } else if (item.type === "Goal") {
        return (
          <circle
            onMouseDown={e => {
              if (e.button === 0) {
                let tempMaze = maze.maze;

                tempMaze[rIndex][cIndex].type = "Wall";

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
            key={`goal - ${rIndex},${cIndex}`}
            className='aGoal'
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

export default CreateObjects;
