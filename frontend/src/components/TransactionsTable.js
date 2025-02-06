import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TransactionsTable = ({
  month,
  searchQuery,
  setSearchQuery,
  setMonth,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions(month, page).then((data) => setTransactions(data));
  }, [month, page]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.price.toString().includes(searchQuery)
  );

  return (
    <div className="table-container">
      <div className="table-header">
        <input
          type="text"
          placeholder="Search transaction..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <h2>Transaction Dashboard</h2>

        <select
          className="month-dropdown"
          onChange={(e) => setMonth(e.target.value)}
          value={month}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page: {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={transactions.length <= 9}>Next</button>
      </div>    
    </div>
  );
};

export default TransactionsTable;
