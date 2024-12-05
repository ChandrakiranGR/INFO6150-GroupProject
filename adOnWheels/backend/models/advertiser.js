const mongoose = require('mongoose');
const advertiserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, default: null },
    companyName: { type: String, default: null },
    address: { type: String, default: null },
    ads: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            budget: { type: Number, required: true },
            adminPrice: { type: Number, default: null },
            status: {
                type: String,
                enum: ['Pending Approval', 'Price Sent', 'Approved', 'Rejected', 'Ready for Publishing'],
                default: 'Pending Approval',
            },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Advertiser', advertiserSchema);
