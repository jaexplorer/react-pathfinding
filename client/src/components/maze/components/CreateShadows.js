import React from "react";

const CreateShadows = ({ maze }) => {
  return maze.maze.map((row, rIndex) => {
    return row.map(
      (item, cIndex) =>
        item.type !== "Wall" && (
          <rect
            key={`shadow - ${rIndex},${cIndex}`}
            className='aShadow'
            y={`${rIndex * 90 + 10}`}
            x={`${cIndex * 90}`}
            width='100'
            height='100'
          />
        )
    );
  });
};

export default CreateShadows;
