const Advertiser = require('../models/advertiser');
const Publisher = require('../models/publisher');
const BodyShop = require('../models/bodyShop');
const Proposal = require('../models/Proposal');
const BodyShopTask = require('../models/bodyShopTask');

// Admin sets price for an ad
exports.setPriceForAd = async (req, res) => {
    try {
        const { adId } = req.params;
        const { advertiserId, adminPrice } = req.body;

        if (!adminPrice || adminPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid admin price is required and must be greater than 0.',
            });
        }

        const advertiser = await Advertiser.findById(advertiserId);
        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }

        const ad = advertiser.ads.id(adId);
        if (!ad) {
            return res.status(404).json({ success: false, message: 'Ad not found.' });
        }

        ad.adminPrice = adminPrice;
        ad.status = 'Price Sent';

        await advertiser.save();

        res.status(200).json({
            success: true,
            message: 'Price set successfully.',
            ad,
        });
    } catch (error) {
        console.error('Error in setPriceForAd:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid advertiser or ad ID format.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// Admin views ads by status
exports.getAdsByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        const query = status ? { 'ads.status': status } : {};
        const advertisers = await Advertiser.find(query, 'name email companyName ads');

        if (!advertisers || advertisers.length === 0) {
            return res.status(404).json({ success: false, message: 'No ads found matching the given status.' });
        }

        const ads = advertisers.flatMap((advertiser) =>
            advertiser.ads
                .filter((ad) => !status || ad.status === status)
                .map((ad) => ({
                    advertiserId: advertiser._id,
                    advertiserName: advertiser.name,
                    email: advertiser.email,
                    ad,
                }))
        );

        res.status(200).json({ success: true, ads });
    } catch (error) {
        console.error('Error in getAdsByStatus:', error.message);

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// Admin creates a proposal
exports.createProposal = async (req, res) => {
    try {
        const { adId, advertiserId, finalPrice } = req.body;

        if (!adId || !advertiserId || !finalPrice) {
            return res.status(400).json({
                success: false,
                message: 'All fields (adId, advertiserId, finalPrice) are required.',
            });
        }

        if (finalPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Final price must be greater than 0.',
            });
        }

        const advertiser = await Advertiser.findById(advertiserId);
        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }

        const ad = advertiser.ads.id(adId);
        if (!ad) {
            return res.status(404).json({ success: false, message: 'Ad not found.' });
        }

        const proposal = await Proposal.create({
            adId,
            advertiserId,
            adminId: req.user.id,
            finalPrice,
        });

        res.status(201).json({
            success: true,
            message: 'Proposal created successfully.',
            proposal,
        });
    } catch (error) {
        console.error('Error in createProposal:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid ad or advertiser ID format.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// Admin views all publishers
exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find({}, 'name email contactNumber vehicleDetails');

        if (!publishers || publishers.length === 0) {
            return res.status(404).json({ success: false, message: 'No publishers found.' });
        }

        res.status(200).json({ success: true, publishers });
    } catch (error) {
        console.error('Error in getAllPublishers:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Admin assigns an ad to a publisher
exports.assignAdToPublisher = async (req, res) => {
    try {
        const { adId, publisherId, payment } = req.body;

        if (!adId || !publisherId || !payment) {
            return res.status(400).json({
                success: false,
                message: 'All fields (adId, publisherId, payment) are required.',
            });
        }

        if (payment <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Payment must be greater than 0.',
            });
        }

        const publisher = await Publisher.findById(publisherId);
        if (!publisher) {
            return res.status(404).json({ success: false, message: 'Publisher not found.' });
        }

        publisher.adAssignments.push({
            adId,
            adminId: req.user.id,
            payment,
        });

        await publisher.save();

        res.status(201).json({ success: true, message: 'Ad assigned to publisher successfully.' });
    } catch (error) {
        console.error('Error in assignAdToPublisher:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid ad or publisher ID format.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// Admin views all body shops
exports.getAllBodyShops = async (req, res) => {
    try {
        const bodyShops = await BodyShop.find({}, 'name email contactNumber address');

        if (!bodyShops || bodyShops.length === 0) {
            return res.status(404).json({ success: false, message: 'No body shops found.' });
        }

        res.status(200).json({ success: true, bodyShops });
    } catch (error) {
        console.error('Error in getAllBodyShops:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Admin assigns a task to a body shop
exports.assignTaskToBodyShop = async (req, res) => {
    try {
        const { adId, bodyShopId, description } = req.body;

        if (!adId || !bodyShopId || !description) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const task = await BodyShopTask.create({
            adId,
            bodyShopId,
            adminId: req.user.id,
            description,
        });

        res.status(201).json({ success: true, message: 'Task assigned to body shop successfully.', task });
    } catch (error) {
        console.error('Error in assignTaskToBodyShop:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
      const totalAds = await Advertiser.aggregate([{ $unwind: "$ads" }, { $count: "totalAds" }]);
      const totalPublishers = await Publisher.countDocuments();
      const totalBodyShops = await BodyShop.countDocuments();
      const pendingTasks = await BodyShopTask.countDocuments({ status: "Pending" });
  
      res.status(200).json({
        adsCount: totalAds[0]?.totalAds || 0,
        publishersCount: totalPublishers || 0,
        bodyShopsCount: totalBodyShops || 0,
        pendingTasks: pendingTasks || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  