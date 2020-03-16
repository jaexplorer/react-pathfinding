import React, { Fragment } from "react";

const ExpandButtons = ({ updateMaze, maze }) => {
  const resetPositions = tempMaze => {
    let myArray = tempMaze;
    for (var y = 0; y < tempMaze.length; y++) {
      for (var x = 0; x < tempMaze[0].length; x++) {
        tempMaze[y][x].x = x;
        tempMaze[y][x].y = y;
      }
    }
    return myArray;
  };

  const expandTop = () => {
    let tempMaze = maze.maze;
    let row = [];
    for (var x = 0; x < tempMaze[0].length; x++) {
      row.push({
        type: "Empty",
        visited: false,
        x: x,
        y: 0,
        parent: null
      });
    }

    tempMaze.unshift(row);
    tempMaze = resetPositions(tempMaze);
    updateMaze({
      maze: tempMaze,
      start: { y: maze.start.y + 1, x: maze.start.x },
      filename: maze.filename
    });
  };

  const expandRight = () => {
    let tempMaze = maze.maze;
    for (var y = 0; y < tempMaze.length; y++) {
      tempMaze[y].push({
        type: "Empty",
        visited: false,
        x: tempMaze[0].length,
        y: y,
        parent: null
      });
    }
    tempMaze = resetPositions(tempMaze);

    updateMaze({ maze: tempMaze, start: maze.start, filename: maze.filename });
  };

  const expandLeft = () => {
    let tempMaze = maze.maze;
    for (var y = 0; y < tempMaze.length; y++) {
      tempMaze[y].unshift({
        type: "Empty",
        visited: false,
        x: 0,
        y: y,
        parent: null
      });
    }
    tempMaze = resetPositions(tempMaze);

    updateMaze({
      maze: tempMaze,
      start: { y: maze.start.y, x: maze.start.x + 1 },
      filename: maze.filename
    });
  };

  const expandBottom = () => {
    let tempMaze = maze.maze;
    let row = [];
    for (var x = 0; x < tempMaze[0].length; x++) {
      row.push({
        type: "Empty",
        visited: false,
        x: x,
        y: tempMaze.length,
        parent: null
      });
    }
    tempMaze = resetPositions(tempMaze);

    tempMaze.push(row);
    updateMaze({ maze: tempMaze, start: maze.start, filename: maze.filename });
  };

  return (
    <Fragment>
      {maze.maze.length <= 10 && (
        <Fragment>
          <div className='expandTop'>
            <div onClick={expandTop} className='button'>
              +
            </div>
          </div>
          <div className='expandBottom'>
            <div onClick={expandBottom} className='button'>
              +
            </div>
          </div>
        </Fragment>
      )}
      {maze.maze[0].length <= 10 && (
        <Fragment>
          <div className='expandRight'>
            <div onClick={expandRight} className='button'>
              +
            </div>
          </div>

          <div className='expandLeft'>
            <div onClick={expandLeft} className='button'>
              +
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ExpandButtons;
