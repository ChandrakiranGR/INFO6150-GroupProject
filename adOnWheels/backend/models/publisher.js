const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  vehicleDetails: {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., "Car", "Truck"
    },
  },
  adsAccepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Advertisement',
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Publisher', publisherSchema);
