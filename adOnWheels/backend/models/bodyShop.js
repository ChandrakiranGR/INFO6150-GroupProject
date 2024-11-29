const mongoose = require('mongoose');

const bodyShopSchema = new mongoose.Schema({
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
  workshopAddress: {
    type: String,
    required: true,
  },
  tasksAssigned: [
    {
      taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BodyShopTask',
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
      },
      dateAssigned: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BodyShop', bodyShopSchema);
