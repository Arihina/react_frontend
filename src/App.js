import React from "react";
import Table from "./Table";
import AddForm from "./AddForm";

import './App.css';


class App extends React.Component {
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
            <div className="App">
                <h3>Income</h3>
                <Table transactions={this.state.incomeTransactions} />

                <h3>Expense</h3>
                <Table transactions={this.state.expenseTransactions} />

                <h3>Add new transaction</h3>
                <AddForm />
            </div>
        );
    }
}

export default App;
