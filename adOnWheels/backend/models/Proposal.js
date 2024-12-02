const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
    {
        adId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertisement',
            required: true,
        },
        advertiserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Advertiser',
            required: true,
        },
        proposedAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Declined'],
            default: 'Pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Proposal', proposalSchema);
