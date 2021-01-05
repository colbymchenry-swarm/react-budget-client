import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../actions'

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.createUser({ monthlyIncome: 1000.0 })
    }

    render(){
        return (
            <div>Dashboard</div>
        )
    }
}

export default connect(null, { createUser })(Dashboard)