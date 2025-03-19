import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Graph = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/statistics/transactions');

            const data = await response.json();

            const groupedData = {};

            data.income.forEach(transaction => {
                const date = new Date(transaction.date).toLocaleDateString();
                groupedData[date] = groupedData[date] || { date, income: 0, expense: 0, originalDate: new Date(transaction.date) };
                groupedData[date].income += transaction.amount;
            });

            data.expense.forEach(transaction => {
                const date = new Date(transaction.date).toLocaleDateString();
                groupedData[date] = groupedData[date] || { date, income: 0, expense: 0, originalDate: new Date(transaction.date) };
                groupedData[date].expense += transaction.amount;
            });

            const chartDataArray = Object.values(groupedData).sort((a, b) => a.originalDate - b.originalDate);
            setChartData(chartDataArray);
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" stackId="a" fill="#82ca9d" name="Income" />
                    <Bar dataKey="expense" stackId="a" fill="#d88484" name="Expense" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
