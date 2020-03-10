import React from "react";

const Legend = () => {
  return (
    <div className='legend-container'>
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
  );
};

export default Legend;
