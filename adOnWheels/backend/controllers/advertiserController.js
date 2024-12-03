const Advertiser = require('../models/advertiser');
const Proposal = require('../models/Proposal');

exports.createAd = async (req, res) => {
    try {
        const { title, description, startDate, endDate, budget } = req.body;

        console.log("Request Body:", req.body);
        console.log("Authenticated User (req.user):", req.user);

        if (!title || !description || !startDate || !endDate || !budget) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        if (!req.user || !req.user.id) {
            console.error("Authenticated user ID is missing from the request.");
            return res.status(401).json({ success: false, message: 'Unauthorized access.' });
        }

        const advertiserId = req.user.id;
        const advertiser = await Advertiser.findById(advertiserId);
        console.log("Advertiser found in DB:", advertiser);

        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }
        const newAd = {
            title,
            description,
            startDate,
            endDate,
            budget,
        };
        advertiser.ads.push(newAd);

        await advertiser.save();

        res.status(201).json({ success: true, message: 'Ad created successfully.', ad: newAd });
    } catch (error) {
        console.error("Error in createAd:", error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};


exports.getAllAds = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.user.id);
        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }
        res.status(200).json({ success: true, ads: advertiser.ads });
    } catch (error) {
        console.error("Error in getAllAds:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.getAdById = async (req, res) => {
    try {
        console.log("Authenticated User ID:", req.user.id);
        console.log("Ad ID in params:", req.params.adId);

        if (!req.params.adId) {
            return res.status(400).json({ success: false, message: 'Ad ID is required.' });
        }

        const advertiser = await Advertiser.findById(req.user.id);

        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found. Please ensure you are logged in with the correct account.' });
        }
        const ad = advertiser.ads.id(req.params.adId);

        if (!ad) {
            return res.status(404).json({ success: false, message: 'Ad not found. Please check the Ad ID.' });
        }

        res.status(200).json({ success: true, ad });
    } catch (error) {
        console.error("Error in getAdById:", error);

        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid Ad ID format. Please provide a valid ID.' });
        }

        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while retrieving the ad. Please try again later.',
            errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined, // Only show detailed error in development
        });
    }
};



exports.getProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find({ advertiserId: req.user.id });
        res.status(200).json({ success: true, proposals });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateProposal = async (req, res) => {
    try {
        const proposal = await Proposal.findById(req.params.proposalId);
        if (!proposal || proposal.advertiserId.toString() !== req.user.id) {
            return res.status(404).json({ success: false, message: 'Proposal not found' });
        }
        proposal.status = req.body.status;
        await proposal.save();
        res.status(200).json({ success: true, message: 'Proposal updated successfully', proposal });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
