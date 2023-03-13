const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cors = require("cors");

// routes
const experiences = require("./routes/experiences");
const portfolios = require("./routes/portfolios");
const messages = require("./routes/messages");
const photos = require("./routes/photos");
const skills = require("./routes/skills");
const users = require("./routes/users");
const auth = require("./routes/auth");

// Connect mongo
const connectDB = require("./config/db");

// Error handle
const errorHandler = require("./middleware/error");
dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Error handler
app.use(errorHandler);

app.use("/api/v1/experiences", experiences);
app.use("/api/v1/portfolios", portfolios);
app.use("/api/v1/messages", messages);
app.use("/api/v1/upload", photos);
app.use("/api/v1/skills", skills);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
