const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://fahim:85D8NzAmBavQyJLr@cluster0.oaexq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try {
        await client.connect();
        const collection = client.db("test").collection("devices");
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
