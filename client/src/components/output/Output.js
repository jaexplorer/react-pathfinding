import React from "react";

const Output = ({ path, maze }) => {
  const createOutput = () => {
    let output = "";
    output = output + `${maze.filename}, ${path.method}, ${path.nodes} \n`;
    if (path.path.length) {
      path.path.forEach(direction => {
        if (direction.direction !== undefined) {
          output = output + direction.direction + "; ";
        }
      });
    } else {
      output = output + "No Solution Found";
    }

    return output;
  };

  return (
    <div className='output-container'>
      Output:
      <div className='output'>{path && createOutput()}</div>
    </div>
  );
};

export default Output;
