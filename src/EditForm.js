import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';


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

    const change = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submit = (e) => {
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
            <form onSubmit={submit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={change}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={transaction.date.split('T')[0]}
                        onChange={change}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <select
                        name="type"
                        value={transaction.type}
                        onChange={change}
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
                        onChange={change}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={transaction.description}
                        onChange={change}
                        required
                    />
                </div>
                <button type="submit">Edit</button>
            </form>
        </div>
    );
};

export default EditForm;
