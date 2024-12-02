const Advertisement = require('../models/advertiser');
const Proposal = require('../models/Proposal');

exports.createAd = async (req, res) => {
    try {
        const { title, description, startDate, endDate, budget } = req.body;

        // Validate request body
        if (!title || !description || !startDate || !endDate || !budget) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Simulate getting the advertiser (e.g., via auth middleware or dummy ID)
        const advertiserId = "64bfc6b1fcd8d3e7c8abcd12"; // Replace with the authenticated user's ID

        // Find the advertiser
        const advertiser = await Advertiser.findById(advertiserId);
        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }

        // Create and add the ad
        const newAd = {
            title,
            description,
            startDate,
            endDate,
            budget,
        };
        advertiser.ads.push(newAd);

        // Save the advertiser with the new ad
        await advertiser.save();

        res.status(201).json({ success: true, message: 'Ad created successfully.', ad: newAd });
    } catch (error) {
        console.error('Error in createAd:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};


// Get All Advertisements
exports.getAllAds = async (req, res) => {
    try {
        const ads = await Advertisement.find({ advertiserId: req.user.id });
        res.status(200).json({ success: true, ads });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get Advertisement by ID
exports.getAdById = async (req, res) => {
    try {
        const ad = await Advertisement.findById(req.params.adId);
        if (!ad || ad.advertiserId.toString() !== req.user.id) {
            return res.status(404).json({ success: false, message: 'Ad not found' });
        }
        res.status(200).json({ success: true, ad });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get All Proposals
exports.getProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find({ advertiserId: req.user.id });
        res.status(200).json({ success: true, proposals });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Approve or Decline Proposal
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
