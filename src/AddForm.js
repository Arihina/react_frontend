import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { transactionAdd } from './actions';


class AddFormInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            date: "",
            type: "expense",
            category: "",
            description: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const amount = Number(this.state.amount);

        const formData = {
            amount: amount,
            date: this.state.date,
            type: this.state.type,
            category: this.state.category,
            description: this.state.description,
        };


        fetch("/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                this.props.dispatch(transactionAdd(
                    data._id, data.amount, data.date, data.type, data.category, data.description
                ));

                if (this.props.onSubmit) {
                    this.props.onSubmit();
                }

                this.props.history('/');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add new transaction</h3>

                <div>
                    <label>Amount:</label>
                    <input type="number" id="amount" name="amount" value={this.state.amount} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Type:</label>
                    <select id="type" name="type" value={this.state.type} onChange={this.handleChange} required >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" id="category" name="category" value={this.state.category} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange} />
                </div>

                <button type="submit">Add</button><br></br>

                <NavLink to='/'>Back to transactions</NavLink>
            </form>
        );
    }
}

const AddForm = (props) => {
    return (
        <AddFormInner {...props} history={useNavigate()} />
    )
}

export default connect()(AddForm);