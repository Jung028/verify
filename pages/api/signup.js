// pages/api/signup.js

import { connectToDatabase } from '../../lib/utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, subject, message } = req.body;

    // Validation (you can customize this to suit your requirements)
    if (!name || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const { client, db } = await connectToDatabase();

      // Insert user data into the database
      await db.collection('users').insertOne({ name, subject, message });

      // Close the MongoDB connection
      client.close();

      return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error('Error inserting user:', error);
      console.error("Error details: ", error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
