import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import './index.css';

const App = () => {
    const [month, setMonth] = useState('March');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="container app">
            <h1>Transaction Dashboard</h1>
            {/* <div className="controls">
                <select
                    className="month-dropdown"
                    onChange={(e) => setMonth(e.target.value)}
                    value={month}
                >
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div> */}

            <Statistics month={month} />
            <TransactionsTable month={month} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setMonth={setMonth}/>
            <BarChart month={month} />
        </div>
    );
};

export default App;
