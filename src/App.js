import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TableWrapper from "./TableWrapper";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

import './App.css';


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<TableWrapper />} />
                        <Route path="/add" element={<AddForm />} />
                        <Route path="/edit/:id" element={<EditForm />} />
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
