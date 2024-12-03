const express = require('express');
const {
    getAdOpportunities,
    updateAdStatus,
    getPaymentDetails,
} = require('../controllers/publisherController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/ads', authMiddleware, roleMiddleware('Publisher'), getAdOpportunities);
router.patch('/ads/:adAssignmentId', authMiddleware, roleMiddleware('Publisher'), updateAdStatus);
router.get('/payments', authMiddleware, roleMiddleware('Publisher'), getPaymentDetails);

module.exports = router;
