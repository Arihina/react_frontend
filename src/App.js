import React from "react";
import Table from "./Table";

import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        fetch('/api/transactions').then(function (res) {
            return res.json();
        }).then((data) => {
            this.setState({ transactions: data })
        });
    }

    render() {
        return (
            <div className="App">
                <Table transactions={this.state.transactions} />
            </div>
        );
    }
}

export default App;
