import React from "react";
import { NavLink } from "react-router-dom";

import Graph from './Graph';


class GraphPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Graph</h1>
                <Graph />
                <NavLink className="nav-link-button" to='/'>Back</NavLink>
            </div>
        )
    }
}

export default GraphPage;
