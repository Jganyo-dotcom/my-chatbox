const express = require("express");
const { connection } = require("./src/config/db");
const http = require("http");
const app = express();
const { init } = require("./src/utils/socket");
const server = http.createServer(app);
const chatappRoute = require("./src/routes/chatapp");
const path = require("path");
const PORT = process.env.PORT || 4444;
app.use(express.json());
connection();
init(server);

app.use(express.static(path.join(__dirname, "src/public")));
app.get("/", (req, res) => {
  res.status(200).send("My Chatapp is starting");
});

app.use("/guest", chatappRoute);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
