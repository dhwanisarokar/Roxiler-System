const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    id: String,
    title: String,
    price: Number,
    description: String,
    category: String,
    sold: Boolean,
    dateOfSale: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);
