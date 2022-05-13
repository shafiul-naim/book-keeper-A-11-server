const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// inventoryUser
// SEZ1RXUIQ9lID7Fj



const uri = "mongodb+srv://inventoryUser:SEZ1RXUIQ9lID7Fj@cluster0.gmdaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("DB connected")
  // perform actions on the collection object
  client.close();
});




app.get("/", (req, res) => {
  res.send("Assignment-11 server is running");
});











app.listen(port, () => {
    console.log("Listening to port", port);
  });