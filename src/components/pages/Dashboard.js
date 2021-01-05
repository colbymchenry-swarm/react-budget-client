import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../actions'

class Dashboard extends React.Component {

    componentDidMount() {
        // we use -5555.0 to create a user in the DB if the user does not exist
        this.props.createUser({ monthlyIncome: -5555.0 })
    }

    render(){
        return (
            <div>Dashboard</div>
        )
    }
}

export default connect(null, { createUser })(Dashboard)