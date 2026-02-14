const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const pollRoutes = require("./routes/polls");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/polls", pollRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      socket.on("join-poll", (pollId) => {
        socket.join(pollId);
      });
    });

    app.set("io", io);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
