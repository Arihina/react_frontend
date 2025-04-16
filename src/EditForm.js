import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';


const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({
        amount: '',
        date: '',
        type: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        fetch(`/api/transactions/${id}`)
            .then(res => res.json())
            .then(data => {
                setTransaction(data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            amount: transaction.amount,
            category: transaction.category,
            description: transaction.description,
            type: transaction.type,
            date: transaction.date
        }

        console.log("Sending this data:", updatedData);

        fetch(`/api/transactions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(res => {
                if (res.ok) {
                    navigate('/');
                }
            });
    };

    return (
        <div>
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={transaction.date.split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select
                        name="type"
                        value={transaction.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={transaction.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={transaction.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button style={{ backgroundColor: '#343a40', border: 'none', color: '#ffffff', borderRadius: '5px', padding: '5px 10px' }}
                    type="submit">Edit</button>
            </form>

            <NavLink style={{ display: 'inline-block', backgroundColor: '#343a40', color: '#ffffff', border: 'none', borderRadius: '5px', padding: '10px 15px', textDecoration: 'none', margin: '10px 0' }}
                to='/'>Back to transactions</NavLink>
        </div>
    );
};

export default EditForm;
