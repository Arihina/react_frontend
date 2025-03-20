import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('/api/statistics/categories');
            const json = await response.json();
            setData(json);

        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const preparePieData = (categories) => {
        if (!categories) {
            return [];
        }

        return Object.entries(categories).map(([category, transactions]) => {
            const totalValue = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
            return { name: category, value: totalValue };
        });
    };

    const incomeData = preparePieData(data.income);
    const expenseData = preparePieData(data.expense);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="40%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                    >
                    </Pie>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={expenseData}
                        cx={500}
                        cy={200}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#d88484"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
