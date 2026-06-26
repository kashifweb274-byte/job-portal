const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/jobportal')
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.get('/api/jobs', async (req, res) => {
  const jobs = await mongoose.connection.collection('Job').find({}).toArray();
  res.json(jobs);
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await mongoose.connection.collection('Job').findOne({ _id: new ObjectId(req.params.id) });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.post('/api/jobs', async (req, res) => {
  await mongoose.connection.collection('Job').insertOne(req.body);
  res.json({ message: "Job saved!" });
});

app.delete('/api/jobs/:id', async (req, res) => {
  await mongoose.connection.collection('Job').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Job deleted!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));