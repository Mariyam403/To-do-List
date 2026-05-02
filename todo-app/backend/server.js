require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", require("./routes/tasks"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`API running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo error:", err));
