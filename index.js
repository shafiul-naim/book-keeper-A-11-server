const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gmdaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log("db connected");
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const inventoriesCollection = client
      .db("bookKeeper")
      .collection("inventory");

    //load inventories

    app.get("/inventories", async (req, res) => {
      const query = {};
      const cursor = inventoriesCollection.find(query);
      const inventories = await cursor.toArray();
      res.send(inventories);
    });


    // specific
    app.get("/inventories/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await inventoriesCollection.findOne(query);
        res.send(service);
      });

    //   Delete
    app.delete("/inventories/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await inventoriesCollection.deleteOne(query);
        res.send(result);
      });

  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assignment-11 server is running");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
