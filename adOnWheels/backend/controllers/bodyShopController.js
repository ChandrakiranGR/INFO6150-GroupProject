const BodyShop = require('../models/bodyShop');
const BodyShopTask = require('../models/bodyShopTask');
const jwt = require('jsonwebtoken');


exports.getAssignedTasks = async (req, res) => {
    try {
        const tasks = await BodyShopTask.find({ bodyShopId: req.user.id }).populate('adId');

        if (tasks.length === 0) {
            return res.status(404).json({ success: false, message: 'No tasks found.' });
        }

        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error in getAssignedTasks:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value.' });
        }

        const task = await BodyShopTask.findOneAndUpdate(
            { _id: taskId, bodyShopId: req.user.id },
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found.' });
        }

        res.status(200).json({ success: true, message: `Task status updated to ${status}.`, task });
    } catch (error) {
        console.error('Error in updateTaskStatus:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.assignTask = async (req, res) => {
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

        res.status(201).json({ success: true, message: 'Task assigned successfully.', task });
    } catch (error) {
        console.error('Error in assignTask:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};


