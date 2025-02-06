const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
    try {
        const { month, page = 1, perPage = 10 } = req.query;
        const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        })
        .skip((page - 1) * perPage)
        .limit(perPage);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

        // Fetch transactions for the selected month across all years
        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        });

        const totalSale = transactions.reduce((sum, t) => sum + t.price, 0);
        const totalSoldItems = transactions.filter(t => t.sold).length;
        const totalUnsoldItems = transactions.length - totalSoldItems;

        res.json({ totalSale, totalSoldItems, totalUnsoldItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
