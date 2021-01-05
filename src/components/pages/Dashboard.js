import React from 'react'
import ListBudgets from './dashboard_comps/ListBudgets'
import Overview from './dashboard_comps/Overview'

const Dashboard = () => {
    return (
        <React.Fragment>
            <Overview />
            <br />
            <ListBudgets />
        </React.Fragment>
    )
}

export default Dashboard