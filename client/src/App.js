import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Maze from "./components/maze/Maze";
import "./assets/styles/main/main.css";

function App() {
  const [maze, setMaze] = useState(false);

  const updateMaze = data => {
    setMaze(data);
    console.log(data);
  };

  return (
    <div>
      {maze && <Maze maze={maze} />}
      <FileUpload updateMaze={updateMaze} />
    </div>
  );
}

export default App;
