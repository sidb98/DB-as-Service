import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  riderId: String,
  startTime: Date,
  endTime: Date,
  startLocation: String,
  endLocation: String,
  assignedUsers: [mongoose.Schema.Types.ObjectId],
});

export const Rider = mongoose.model('Rider', rideSchema);
