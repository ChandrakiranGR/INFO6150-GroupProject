const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const advertiserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, default: null },
    role: { type: String, default: 'Advertiser' },
    companyName: { type: String, default: null },
    address: { type: String, default: null },
    ads: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            budget: { type: Number, required: true }, // Proposed budget by advertiser
            adminPrice: { type: Number, default: null }, // Price set by admin
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

advertiserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Advertiser', advertiserSchema);
