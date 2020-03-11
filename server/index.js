const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static("uploads"));
app.use(express.json());

app.use(fileUpload());
app.use("/api/upload", require("./routes/upload"));
app.use("/api/search/DFS", require("./routes/search/DFS"));
app.use("/api/search/BFS", require("./routes/search/BFS"));
app.use("/api/search/GBFS", require("./routes/search/GBFS"));
app.use("/api/search/AS", require("./routes/search/AS"));
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started..."));
