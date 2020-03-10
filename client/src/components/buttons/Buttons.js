import React from "react";
import axios from "axios";

const Buttons = ({ maze, updatePath }) => {
  const DFSSearch = async () => {
    updatePath(false);
    try {
      const res = await axios.post("/api/search/DFS", maze);
      updatePath(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const BFSSearch = async () => {
    updatePath(false);
    try {
      const res = await axios.post("/api/search/BFS", maze);
      updatePath(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='buttons-container'>
      <div className='button-container'>
        <div onClick={DFSSearch} className='button'>
          DFS
        </div>
        <div className='description'>Depth First Search</div>
      </div>

      <div className='button-container'>
        <div onClick={BFSSearch} className='button'>
          BFS
        </div>
        <div className='description'>Breadth First Search</div>
      </div>

      <div className='button-container'>
        <div className='button'>GBFS</div>
        <div className='description'>Greedy Best-First</div>
      </div>

      <div className='button-container'>
        <div className='button'>AS</div>
        <div className='description'>A *</div>
      </div>
    </div>
  );
};

export default Buttons;
