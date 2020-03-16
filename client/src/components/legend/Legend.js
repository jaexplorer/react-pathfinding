import React from "react";

const Legend = () => {
  return (
    <div className='legend-container'>
      <div className='row'>
        <div className='legend-wrapper'>
          <div className='agent'></div>
          <div className='legend-text'>Agent</div>
        </div>
        <div className='legend-wrapper'>
          <div className='goal'></div>
          <div className='legend-text'>Goal States</div>
        </div>
        <div className='legend-wrapper'>
          <div className='path'></div>
          <div className='legend-text'>Path</div>
        </div>
        <div className='legend-wrapper'>
          <div className='node'></div>
          <div className='legend-text'>Empty Node</div>
        </div>
      </div>
      <div className='row'>
        <div className='instruction'>
          <strong>Instructions: </strong>
          To edit the map, use the + and - signs on the edges to expand/shrink
          the map. Left click to toggle walls and right click to place or edit
          nodes. Once you are happy with the map click one of the path finding
          method buttons below.
        </div>
      </div>
    </div>
  );
};

export default Legend;
