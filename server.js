import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import booksData from "./data/books.json";
import dotenv from "dotenv";
dotenv.config();

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/Project_MongoDB";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.get("books/:bookId", async (req, res) => {
  try {
    const book = await UserActivation.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid book id" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
