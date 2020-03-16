import React from "react";

const CreateMaze = ({ maze, updateMaze, updateDropdown }) => {
  return maze.maze.map((row, rIndex) => {
    return row.map((item, cIndex) => {
      if (item.type !== "Wall") {
        return (
          <rect
            key={`space - ${rIndex},${cIndex}`}
            onMouseDown={e => {
              if (e.button === 0) {
                let tempMaze = maze.maze;

                if (tempMaze[rIndex][cIndex].type !== "Agent") {
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
            className='aRect'
            y={`${rIndex * 90}`}
            x={`${cIndex * 90}`}
            width='100'
            height='100'
          />
        );
      } else if (item.type === "Wall") {
        return (
          <rect
            key={`empty space - ${rIndex},${cIndex}`}
            onMouseDown={e => {
              if (e.button === 0) {
                let tempMaze = maze.maze;
                tempMaze[rIndex][cIndex].type = "Empty";

                updateMaze({
                  maze: tempMaze,
                  start: maze.start,
                  filename: maze.filename
                });
              }
            }}
            fill='rgb(0,0,0,0)'
            y={`${rIndex * 90}`}
            x={`${cIndex * 90}`}
            width='100'
            height='100'
          />
        );
      } else {
        return null;
      }
    });
  });
};

export default CreateMaze;
