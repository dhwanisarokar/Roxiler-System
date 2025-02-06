const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchDataAndStore = async () => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(data);
        console.log('Data successfully stored in database');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = fetchDataAndStore;
