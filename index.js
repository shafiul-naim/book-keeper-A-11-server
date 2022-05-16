const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { application } = require("express");
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

    // Load specific inventory
    app.get("/inventories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const inventory = await inventoriesCollection.findOne(query);
      res.send(inventory);
    });

    // my items all
    app.get("/myitems", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { email: email };
      const cursor = inventoriesCollection.find(query);
      const myItems = await cursor.toArray();
      res.send(myItems);
    });
    // my item single
    app.get("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const inventory = await inventoriesCollection.findOne(query);
      res.send(inventory);
    });

    // Add items

    app.post("/inventories", async (req, res) => {
      const newItem = req.body;
      const result = await inventoriesCollection.insertOne(newItem);
      res.send(result);
    });

    //   update
    app.put("/inventories/:id", async (req, res) => {
      const id = req.params.id;
      const updatedInventory = req.body.updatedQuantity;
      console.log(updatedInventory);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Quantity: updatedInventory,
        },
      };
      const result = await inventoriesCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    //   Delete
    app.delete("/inventories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoriesCollection.deleteOne(query);
      res.send(result);
    });

    // my item delete
    app.delete("/myitems/:id", async (req, res) => {
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



