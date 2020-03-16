import React, { Fragment } from "react";

const SubtractButtons = ({ updateMaze, maze }) => {
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

  const subtractTop = () => {
    let tempMaze = maze.maze;
    tempMaze.shift();
    tempMaze = resetPositions(tempMaze);

    updateMaze({
      maze: tempMaze,
      start: { y: maze.start.y - 1, x: maze.start.x },
      filename: maze.filename
    });
  };

  const subtractRight = () => {
    let tempMaze = maze.maze;
    for (var y = 0; y < tempMaze.length; y++) {
      tempMaze[y].pop();
    }
    tempMaze = resetPositions(tempMaze);

    updateMaze({ maze: tempMaze, start: maze.start, filename: maze.filename });
  };

  const subtractLeft = () => {
    let tempMaze = maze.maze;
    for (var y = 0; y < tempMaze.length; y++) {
      tempMaze[y].shift();
    }
    tempMaze = resetPositions(tempMaze);

    updateMaze({
      maze: tempMaze,
      start: { y: maze.start.y, x: maze.start.x - 1 },
      filename: maze.filename
    });
  };

  const subtractBottom = () => {
    let tempMaze = maze.maze;
    tempMaze.pop();
    tempMaze = resetPositions(tempMaze);

    updateMaze({ maze: tempMaze, start: maze.start, filename: maze.filename });
  };

  return (
    <Fragment>
      {maze.maze.length > 2 && (
        <Fragment>
          {maze.start.y !== 0 && (
            <div className='subtractTop'>
              <div onClick={subtractTop} className='button'>
                -
              </div>
            </div>
          )}
          {maze.start.y !== maze.maze.length - 1 && (
            <div className='subtractBottom'>
              <div onClick={subtractBottom} className='button'>
                -
              </div>
            </div>
          )}
        </Fragment>
      )}
      {maze.maze[0].length > 2 && (
        <Fragment>
          {maze.start.x !== maze.maze[0].length - 1 && (
            <div className='subtractRight'>
              <div onClick={subtractRight} className='button'>
                -
              </div>
            </div>
          )}

          {maze.start.x !== 0 && (
            <div className='subtractLeft'>
              <div onClick={subtractLeft} className='button'>
                -
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default SubtractButtons;
