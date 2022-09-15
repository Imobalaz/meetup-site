import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    console.log("started");

    
    const client = await MongoClient.connect(
      "mongodb+srv://imobalaz:imobalaz@cluster0.he400wt.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    console.log("connected");
    const db = client.db();
    console.log("client db");

    const meetupsCollection = db.collection("meetups");
    console.log("created collections");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
