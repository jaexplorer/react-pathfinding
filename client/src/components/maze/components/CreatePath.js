import React, { Fragment } from "react";

const CreatePath = ({ path }) => {
  let prevNode = path.path[0];
  return path.path.map((node, index) => {
    const drawnPath = (
      <Fragment key={index}>
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
          r={`${index === 0 || index === path.path.length - 1 ? "20" : "15"}`}
        />
      </Fragment>
    );
    prevNode = node;
    return drawnPath;
  });
};

export default CreatePath;
