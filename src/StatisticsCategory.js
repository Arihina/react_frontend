import React from "react";
import { NavLink } from "react-router-dom";

import Chart from "./Chart";


class ChartPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Chart</h1>
                <Chart />
                <NavLink to='/'>Back</NavLink>
            </div>
        )
    }
}

export default ChartPage;
