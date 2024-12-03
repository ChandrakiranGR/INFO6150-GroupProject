const Publisher = require('../models/publisher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getAdOpportunities = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.user.id).populate('adAssignments.adId');

        if (!publisher) {
            return res.status(404).json({
                success: false,
                message: 'No publisher found for the logged-in user.',
            });
        }

        if (!publisher.adAssignments || publisher.adAssignments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No ad opportunities found for this publisher.',
            });
        }

        res.status(200).json({ success: true, adAssignments: publisher.adAssignments });
    } catch (error) {
        console.error('Error in getAdOpportunities:', error.message);

        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching ad opportunities. Please try again later.',
        });
    }
};


exports.updateAdStatus = async (req, res) => {
    try {
        const { adAssignmentId } = req.params;
        const { status } = req.body;

        if (!status || !['Accepted', 'Declined'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value. Allowed values are "Accepted" or "Declined".',
            });
        }

        const publisher = await Publisher.findOneAndUpdate(
            { _id: req.user.id, 'adAssignments._id': adAssignmentId },
            {
                $set: {
                    'adAssignments.$.status': status,
                    'adAssignments.$.updatedAt': Date.now(),
                },
            },
            { new: true }
        );

        if (!publisher) {
            return res.status(404).json({
                success: false,
                message: 'Ad assignment not found for the given ID and logged-in publisher.',
            });
        }

        res.status(200).json({
            success: true,
            message: `Ad status updated to "${status.toLowerCase()}".`,
            adAssignments: publisher.adAssignments,
        });
    } catch (error) {
        console.error('Error in updateAdStatus:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ad assignment ID format. Please provide a valid ID.',
            });
        }

        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the ad status. Please try again later.',
        });
    }
};


exports.getPaymentDetails = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.user.id);

        if (!publisher) {
            return res.status(404).json({
                success: false,
                message: 'No publisher found for the logged-in user.',
            });
        }

        const payments = publisher.adAssignments.filter((ad) => ad.status === 'Accepted');

        if (!payments || payments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No payments found for the logged-in publisher.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payments retrieved successfully.',
            payments,
        });
    } catch (error) {
        console.error('Error in getPaymentDetails:', error.message);

        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving payment details. Please try again later.',
        });
    }
};


