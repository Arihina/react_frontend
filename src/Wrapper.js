import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Table from "./Table";
import { transactionAddAll, transactionDelete } from './actions';


class Wrapper extends React.Component {
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
                <h3>Transactions</h3>
                <div className="table-container">
                    <div className="table-wrapper">
                        <h4>Income</h4>
                        <Table style={{ backgroundColor: '#d4edda', border: '1px solid #c3e6cb' }}
                            transactions={incomeTransactions} onDelete={this.deleteTransaction} />
                    </div>
                    <div className="table-wrapper">
                        <h4>Expense</h4>
                        <Table style={{ backgroundColor: '#f8d7da', border: '1px solid #f5c6cb' }}
                            transactions={expenseTransactions} onDelete={this.deleteTransaction} />
                    </div>
                </div>

                <NavLink className="nav-link-button" to="/add">Add transaction</NavLink><br />
                <NavLink className="nav-link-button" to="/statistics/transactions">To transactions statistics</NavLink><br />
                <NavLink className="nav-link-button" to="/statistics/categories">To categories statistics</NavLink>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
    };
};

export default connect(mapStateToProps)(Wrapper);
