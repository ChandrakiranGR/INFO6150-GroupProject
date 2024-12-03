const Publisher = require('../models/publisher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getAdOpportunities = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.user.id).populate('adAssignments.adId');

        if (!publisher) {
            return res.status(404).json({ success: false, message: 'Publisher not found.' });
        }

        res.status(200).json({ success: true, adAssignments: publisher.adAssignments });
    } catch (error) {
        console.error('Error in getAdOpportunities:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.updateAdStatus = async (req, res) => {
    try {
        const { adAssignmentId } = req.params;
        const { status } = req.body;

        if (!['Accepted', 'Declined'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        const publisher = await Publisher.findOneAndUpdate(
            { _id: req.user.id, 'adAssignments._id': adAssignmentId },
            { $set: { 'adAssignments.$.status': status, 'adAssignments.$.updatedAt': Date.now() } },
            { new: true }
        );

        if (!publisher) {
            return res.status(404).json({ success: false, message: 'Ad assignment not found.' });
        }

        res.status(200).json({ success: true, message: `Ad ${status.toLowerCase()} successfully.`, publisher });
    } catch (error) {
        console.error('Error in updateAdStatus:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.getPaymentDetails = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.user.id);

        if (!publisher) {
            return res.status(404).json({ success: false, message: 'Publisher not found.' });
        }

        const payments = publisher.adAssignments.filter((ad) => ad.status === 'Accepted');

        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('Error in getPaymentDetails:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

