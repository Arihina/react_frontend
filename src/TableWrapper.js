import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Table from "./Table";
import { transactionAddAll, transactionDelete } from './actions';


class TableWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getTransactions();
    }

    getTransactions = () => {
        fetch("/api/transactions")
            .then((res) => res.json())
            .then((data) => {
                this.props.dispatch(transactionAddAll(data));
            });
    };

    deleteTransaction = (id) => {
        console.log("deleteTransaction called with ID:", id);
        fetch(`/api/transactions/${id}`, {
            method: "DELETE",
        })
            .then(res => {
                this.props.dispatch(transactionDelete(id));
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    };

    render() {

        const incomeTransactions = this.props.transactions.filter(
            (transaction) => transaction.type === "income"
        );
        const expenseTransactions = this.props.transactions.filter(
            (transaction) => transaction.type === "expense"
        );

        return (
            <div>
                <h3>Income</h3>
                <Table transactions={incomeTransactions} onDelete={this.deleteTransaction} />

                <h3>Expense</h3>
                <Table transactions={expenseTransactions} onDelete={this.deleteTransaction} />

                <NavLink to="/add">Add transaction</NavLink>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
    };
};

export default connect(mapStateToProps)(TableWrapper);
