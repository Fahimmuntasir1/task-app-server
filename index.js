const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

//mongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oaexq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("task-app").collection("tasks");

    // post tasks
    app.post("/addTask", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await taskCollection.insertOne(data);
      res.send(result);
    });

    // get tasks
    app.get("/tasks", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });

    // update tasks and
    app.put("/upToDo/:id", async (req, res) => {
      const id = req.params.id;
      const todo = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          data: todo.updateTodo,
        },
      };
      const Todo = await taskCollection.updateOne(filter, updateDoc, options);
      res.send({ success: true, data: Todo });
    });

    // checkbox and complete task
    app.patch("/Checkbox/:CheckID", async (req, res) => {
      const data = req.params.CheckID;
      const id = { _id: ObjectId(data) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          Checkbox: true,
        },
      };
      const result = await taskCollection.updateOne(id, updateDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("running my task application");
});

app.listen(port, () => {
  console.log("CRUD is running ");
});

// db pass : 85D8NzAmBavQyJLr
// P4AV94gPEPqmAxaq
