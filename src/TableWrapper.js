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
        fetch('/api/transactions').then(function (res) {
            return res.json();
        }).then((data) => {
            const income = data.filter(transaction => transaction.type === 'income');
            const expense = data.filter(transaction => transaction.type === 'expense');

            this.setState({
                transactions: data,
                incomeTransactions: income,
                expenseTransactions: expense
            });
        });
    }

    render() {
        return (
            <div>
                <h3>Income</h3>
                <Table transactions={this.state.incomeTransactions} />

                <h3>Expense</h3>
                <Table transactions={this.state.expenseTransactions} />

                <NavLink to='/add'>Add transaction</NavLink>
            </div>
        )
    }
}

export default TableWrapper;
