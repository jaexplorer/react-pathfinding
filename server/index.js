import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import upload from "./routes/upload";
import DFS from "./routes/search/DFS";
import BFS from "./routes/search/BFS";
import GBFS from "./routes/search/GBFS";
import AS from "./routes/search/AS";

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static("uploads"));
app.use(express.json());

app.use(fileUpload());
app.use("/api/upload", upload);
app.use("/api/search/DFS", DFS);
app.use("/api/search/BFS", BFS);
app.use("/api/search/GBFS", GBFS);
app.use("/api/search/AS", AS);
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started..."));
