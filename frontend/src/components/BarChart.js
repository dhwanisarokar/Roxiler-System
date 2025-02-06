import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ month }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchTransactions(month).then(data => {
            const priceRanges = [
                { range: '0-100', count: 0 },
                { range: '101-200', count: 0 },
                { range: '201-300', count: 0 },
                { range: '301-400', count: 0 },
                { range: '401-500', count: 0 },
                { range: '501-600', count: 0 },
                { range: '601-700', count: 0 },
                { range: '701-800', count: 0 },
                { range: '801-900', count: 0 },
                { range: '901-above', count: 0 }
            ];

            data.forEach(transaction => {
                const price = transaction.price;
                const range = priceRanges.find(r => {
                    const [min, max] = r.range.split('-').map(Number);
                    return price >= min && (max ? price <= max : true);
                });
                if (range) range.count += 1;
            });

            setChartData(priceRanges);
        });
    }, [month]);

    return (
        <div className="chart-container">
            <h2>Bar Chart Stats - {month}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3498db" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
