import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, connect } from 'react-redux';

import Wrapper from "./Wrapper";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import GraphPage from './StatisticsTransactions.js';
import ChartPage from "./StatisticsCategory.js";

import './App.css';


class App extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Wrapper />} />
                        <Route path="/add" element={<AddForm />} />
                        <Route path="/edit/:id" element={<EditForm />} />
                        <Route path="/statistics/transactions" element={<GraphPage />} />
                        <Route path="/statistics/categories" element={<ChartPage />} />
                    </Routes>
                </Router>
            </div>
            </Provider>
        );
    }
}

export default connect()(App);
