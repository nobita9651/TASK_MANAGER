// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();  // Ensure environment variables are loaded

const app = express();
const port = process.env.PORT || 5000;  // Set port from environment variable or default to 5000
const mongoURI = process.env.MONGO_URI;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("taskmanager");

    app.get("/api/tasks", async (req, res) => {
      try {
        const tasks = await db.collection("tasks").find().toArray();
        res.json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.post("/api/tasks", async (req, res) => {
      const { text } = req.body;
      try {
        if (!text) {
          res.status(400).json({ error: "Task text is required" });
          return;
        }
        const result = await db.collection("tasks").insertOne({ text, completed: false });
        const insertedTask = await db.collection("tasks").findOne({ _id: result.insertedId });
        res.json(insertedTask);
      } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.put("/api/tasks/:id", async (req, res) => {
      const taskId = req.params.id;
      const { completed, text } = req.body;
      try {
        const updateFields = {};
        if (completed !== undefined) updateFields.completed = completed;
        if (text) updateFields.text = text;
        const result = await db.collection("tasks").findOneAndUpdate(
          { _id: new ObjectId(taskId) },
          { $set: updateFields },
          { returnOriginal: false }
        );
        res.json(result.value);
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.delete("/api/tasks/:id", async (req, res) => {
      const taskId = req.params.id;
      try {
        const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(taskId) });
        if (result.deletedCount === 1) {
          res.json({ id: taskId });
        } else {
          res.status(404).json({ error: "Task not found" });
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
