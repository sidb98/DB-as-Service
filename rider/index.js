import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Rider } from './model/Rider.js';
import { User } from './model/User.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connected');
    } catch (err) {
      console.error(err);
      process.exit(1); // Exit process with failure
    }
  };
  
  connectDB();

// Get information about a ride
app.get('/ride/:id', async (req, res) => {
  try {
    const ride = await Rider.findOne({riderId: req.params.id});
    if (!ride) return res.status(404).send('Rider not found');
    res.send(ride);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a ride
app.post('/ride', async (req, res) => {
  try {
    const ride = new Rider(req.body);
    await ride.save();
    res.status(201).send(ride);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Assign a user to a ride
app.post('/assign/:riderId/:userId', async (req, res) => {
  try {
    const { riderId, userId } = req.params;
    const rider = await Rider.findOne({riderId:riderId}); 
    if (!rider) return res.status(404).send('Ride not found');

    const user = await User.findOne({userId:userId}); 
    if (!user) return res.status(404).send('User not found');

    if (!rider.assignedUsers.includes(userId)) {
      rider.assignedUsers.push(user._id);
      await rider.save();
    }

    res.send(rider);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
