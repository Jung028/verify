import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://aedamjung:l4p7Wd4daeh3S1hb@cluster1.pvc5ijl.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI

export async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();
    const db = client.db("verify_user_database"); // Specify your database name if necessary
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
