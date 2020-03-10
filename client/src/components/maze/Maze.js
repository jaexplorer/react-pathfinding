import React, { Fragment, useState } from "react";
import Legend from "../legend/Legend";
import Buttons from "../buttons/Buttons";

const Maze = ({ maze }) => {
  const [path, setPath] = useState(false);

  const updatePath = data => {
    setPath(data);
  };

  const createPath = () => {
    let prevNode = path[0];
    return path.map((node, index) => {
      const drawnPath = (
        <Fragment>
          <line
            key={`line - ${index}`}
            className='aLine'
            x1={`${prevNode.x * 90 + 50}`}
            y1={`${prevNode.y * 90 + 50}`}
            x2={`${node.x * 90 + 50}`}
            y2={`${node.y * 90 + 50}`}
          />
          <circle
            key={`circle - ${index}`}
            className='aPath'
            cy={`${node.y * 90 + 50}`}
            cx={`${node.x * 90 + 50}`}
            r={`${index === 0 || index === path.length - 1 ? "20" : "15"}`}
          />
        </Fragment>
      );
      prevNode = node;
      return drawnPath;
    });
  };

  const createMaze = () => {
    return maze.maze.map((row, rIndex) => {
      return row.map(
        (item, cIndex) =>
          item !== "Wall" && (
            <rect
              key={`wall - ${rIndex},${cIndex}`}
              className='aRect'
              y={`${rIndex * 90}`}
              x={`${cIndex * 90}`}
              width='100'
              height='100'
            />
          )
      );
    });
  };

  const createShadows = () => {
    return maze.maze.map((row, rIndex) => {
      return row.map(
        (item, cIndex) =>
          item !== "Wall" && (
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

  const createObjects = () => {
    return maze.maze.map((row, rIndex) => {
      return row.map((item, cIndex) => {
        if (item === "Agent") {
          return (
            <circle
              key={`agent - ${rIndex},${cIndex}`}
              className='aAgent'
              cy={`${rIndex * 90 + 50}`}
              cx={`${cIndex * 90 + 50}`}
              r='15'
            />
          );
        } else if (item === "Goal") {
          return (
            <circle
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

  const createEmptyNodes = () => {
    return maze.maze.map((row, rIndex) => {
      return row.map((item, cIndex) => {
        if (item === "Empty") {
          return (
            <circle
              key={`empty - ${rIndex},${cIndex}`}
              className='empty'
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

  return (
    <div className='maze-container'>
      <div className='title'>
        <h1>AI Search Algorithms</h1>
        <h2>By Andrew Sabato 101118959</h2>
      </div>
      <Legend />
      <div className='maze'>
        <svg
          viewBox={`0 0 ${maze.maze[0].length * 100 - 100} ${maze.maze.length *
            100}`}
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
            {createShadows()}
          </g>
          <g id='map' filter='url(#goo)'>
            {createMaze()}
          </g>
          {createEmptyNodes()}
          {path && createPath()}
          {createObjects()}
        </svg>
      </div>
      <Buttons maze={maze} updatePath={updatePath} />
    </div>
  );
};

export default Maze;
