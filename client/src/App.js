import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import Maze from "./components/maze/Maze";
import "./assets/styles/main/main.css";

function App() {
  const [maze, setMaze] = useState(false);

  const updateMaze = data => {
    setMaze(data);
    console.log(data);
  };

  useEffect(() => {
    document.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
  }, []);

  return (
    <div>
      {maze && <Maze maze={maze} updateMaze={updateMaze} />}
      <FileUpload updateMaze={updateMaze} />
    </div>
  );
}

export default App;
