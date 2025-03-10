import React from "react";


class AddForm extends React.Component {
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
                this.setState({
                    amount: "",
                    date: "",
                    type: "expense",
                    category: "",
                    description: "",
                });

                if (this.props.onSubmit) {
                    this.props.onSubmit();
                }
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

                <button type="submit">Add</button>
            </form>
        );
    }
}

export default AddForm;