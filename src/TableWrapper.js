import React from "react";
import { NavLink } from "react-router-dom";

import Table from "./Table"


class TableWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            incomeTransactions: [],
            expenseTransactions: []
        }
    }

    componentDidMount() {
        this.getTransactions();
    }

    getTransactions = () => {
        fetch('/api/transactions')
            .then(res => res.json())
            .then((data) => {
                const income = data.filter(transaction => transaction.type === 'income');
                const expense = data.filter(transaction => transaction.type === 'expense');

                this.setState({
                    transactions: data,
                    incomeTransactions: income,
                    expenseTransactions: expense
                });
            });
    }

    deleteTransaction = (id) => {
        fetch(`/api/transactions/${id}`, {
            method: 'DELETE',
        }).then(res => this.getTransactions())
    }

    render() {
        return (
            <div>
                <h3>Income</h3>
                <Table transactions={this.state.incomeTransactions} onDelete={this.deleteTransaction}/>

                <h3>Expense</h3>
                <Table transactions={this.state.expenseTransactions} onDelete={this.deleteTransaction}/>

                <NavLink to='/add'>Add transaction</NavLink>
            </div>
        )
    }
}

export default TableWrapper;
