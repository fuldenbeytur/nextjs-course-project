import { MongoClient } from "mongodb";

// /api/meetups
// GET /api/meetups
async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://fuldenbeytur:SDWAHaZzo4BW5XwJ@cluster0.1ats3.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();
    res.status(200).json({ data: meetups });

    client.close();
  }
}

export default handler;
