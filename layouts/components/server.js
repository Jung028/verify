// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://aedamjung:l4p7Wd4daeh3S1hb@cluster1.pvc5ijl.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for the user
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint for user registration
app.post('/api/signup', (req, res) => {
  const { name, email, subject, message } = req.body;
  const user = new User({ name, email, subject, message });

  user.save((err) => {
    if (err) {
      return res.status(500).send('Error saving user');
    }
    return res.status(200).send('User saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
