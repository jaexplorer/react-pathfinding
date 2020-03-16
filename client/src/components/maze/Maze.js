import React, { useState, useEffect } from "react";
import Legend from "../legend/Legend";
import Buttons from "../buttons/Buttons";
import Output from "../output/Output";
import CreateEmptyNodes from "./components/CreateEmptyNodes";
import CreateMaze from "./components/CreateMaze";
import CreateObjects from "./components/CreateObjects";
import CreatePath from "./components/CreatePath";
import CreateShadows from "./components/CreateShadows";
import ExpandButtons from "./utils/ExpandButtons";
import SubtractButtons from "./utils/SubtractButtons";
import Dropdown from "./utils/Dropdown";

const Maze = ({ maze, updateMaze }) => {
  const [path, setPath] = useState(false);
  const [createDropdown, setCreateDropdown] = useState(false);

  const updatePath = data => {
    setPath(data);
    console.log(data);
  };

  const updateDropdown = data => {
    setCreateDropdown(data);
  };

  useEffect(() => {
    setPath(false);
  }, [maze]);

  return (
    <div className='maze-container'>
      <div className='title'>
        <h1>AI Search Algorithms</h1>
        <h2>By Andrew Sabato 101118959</h2>
      </div>
      <Legend />
      <div className='maze'>
        <svg
          viewBox={`0 0 ${100 + (maze.maze[0].length - 1) * 90} ${110 +
            (maze.maze.length - 1) * 90}`}
          width={100 + (maze.maze[0].length - 1) * 90}
          height={110 + (maze.maze.length - 1) * 90}
        >
          <defs>
            <filter id='goo'>
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation='6'
                result='blur'
              />
              <feColorMatrix
                in='blur'
                mode='matrix'
                values='1 0 0 0 0  
                        0 1 0 0 0  
                        0 0 1 0 0  
                        0 0 0 24 -16'
                result='goo'
              />
              <feComposite in='SourceGraphic' in2='goo' operator='atop' />
            </filter>
          </defs>
          <g id='shadows' filter='url(#goo)'>
            <CreateShadows maze={maze} />
          </g>
          <g id='map' filter='url(#goo)'>
            <CreateMaze
              maze={maze}
              updateMaze={updateMaze}
              updateDropdown={updateDropdown}
            />
          </g>
          <CreateEmptyNodes
            maze={maze}
            updateMaze={updateMaze}
            updateDropdown={updateDropdown}
          />
          {path && <CreatePath path={path} />}
          <CreateObjects
            maze={maze}
            updateMaze={updateMaze}
            updateDropdown={updateDropdown}
          />
        </svg>
        <ExpandButtons maze={maze} updateMaze={updateMaze} />
        <SubtractButtons maze={maze} updateMaze={updateMaze} />
        {
          <Dropdown
            maze={maze}
            createDropdown={createDropdown}
            updateMaze={updateMaze}
            updateDropdown={updateDropdown}
          />
        }
      </div>
      <Output maze={maze} path={path} />
      <Buttons maze={maze} updatePath={updatePath} />
    </div>
  );
};

export default Maze;
