import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

export const fetchTransactions = async (month, page = 1) => {
    const { data } = await axios.get(`${API_URL}/transactions?month=${month}&page=${page}`);
    
    return data;
};

export const fetchStatistics = async (month) => {
    const { data } = await axios.get(`${API_URL}/statistics?month=${month}`);
   
    return data;
};
