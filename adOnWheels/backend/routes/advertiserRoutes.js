const express = require('express');
const {
    createAd,
    getAllAds,
    getAdById,
    getProposals,
    updateProposal
} = require('../controllers/advertiserController');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Routes
router.post('/ads', createAd);
router.get('/ads', getAllAds);
router.get('/ads/:adId', getAdById);
router.get('/proposals', getProposals);
router.patch('/proposals/:proposalId', updateProposal);

module.exports = router;
