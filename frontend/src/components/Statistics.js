import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../services/api';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalUnsoldItems: 0 });

    useEffect(() => {
        fetchStatistics(month).then(data => setStats(data));
    }, [month]);

    return (
        <div className="stats-container">
            <h2>Statistics - {month}</h2>
            <div className="stats-box">
                <p><strong>Total Sale:</strong> {stats.totalSale}</p>
                <p><strong>Total Sold Items:</strong> {stats.totalSoldItems}</p>
                <p><strong>Total Unsold Items:</strong> {stats.totalUnsoldItems}</p>
            </div>
        </div>
    );
};

export default Statistics;
