const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bodyShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, default: null },
    workshopAddress: { type: String, default: null },
    dateCreated: { type: Date, default: Date.now },
});

bodyShopSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('BodyShop', bodyShopSchema);
