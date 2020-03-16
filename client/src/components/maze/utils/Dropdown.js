import React, { Fragment, useEffect, useRef } from "react";

const Dropdown = ({ createDropdown, updateDropdown, maze, updateMaze }) => {
  const dropdown = useRef(null);

  useEffect(() => {
    const handleClick = e => {
      createDropdown &&
        !dropdown.current.contains(e.target) &&
        updateDropdown(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  const optionClicked = string => {
    let tempArray = maze.maze;
    tempArray[createDropdown.y][createDropdown.x].type = string;

    if (string === "Agent") {
      console.log(maze.start);
      tempArray[maze.start.y][maze.start.x].type = "Empty";
      updateMaze({
        maze: tempArray,
        start: { y: createDropdown.y, x: createDropdown.x },
        filename: maze.filename
      });
    } else {
      updateMaze({
        maze: tempArray,
        start: maze.start,
        filename: maze.filename
      });
    }

    updateDropdown(false);
  };

  return (
    <Fragment>
      {createDropdown && (
        <div
          className='dropdownContainer'
          ref={dropdown}
          style={{
            top: `${createDropdown.clientY}px`,
            left: `${createDropdown.clientX}px`
          }}
        >
          <div onClick={() => optionClicked("Agent")} className='option'>
            <div className='agent-option'></div>
            <div className='option-text'>Agent</div>
          </div>
          <div onClick={() => optionClicked("Goal")} className='option'>
            <div className='goal-option'></div>
            <div className='option-text'>Goal</div>
          </div>
          <div onClick={() => optionClicked("Empty")} className='option'>
            <div className='empty-option'></div>
            <div className='option-text'>Empty Node</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dropdown;
