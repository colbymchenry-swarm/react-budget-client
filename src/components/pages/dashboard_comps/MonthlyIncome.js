import React from 'react'
import { connect } from 'react-redux'
import { setMonthlyIncome, fetchMonthlyIncome, fetchUsers } from '../../../actions'

class MonthlyIncome extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            amount: 0,
            synced: false
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
        this.props.fetchMonthlyIncome()
    }

    submitForm = (e) => {
        e.preventDefault()
  
        let formValues = {
            amount: this.state.amount,
        }

        this.props.setMonthlyIncome(formValues)
    }

    render() {
        console.log(this.props.income)

        let userId = this.props.users.find(user => {
            if (user.userId === this.props.userId) {
                return user.id
            }
        })

        if(userId === undefined) {
            this.props.setMonthlyIncome(null, { amount: 1000 })
        }

        return (
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="currency" className="form-control" placeholder="$50.00" value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />
                    <small className="form-text text-muted">This is on a per month basis.</small>
                </div>
                <button type="submit" className="btn btn-primary float-right">Save</button>
            </form>
        )
    }

}

const mapStateToProps = state => {
    return { 
        income: state.monthlyIncome,
        users: Object.values(state.users),
        userId: state.auth.userId
     }
}

export default connect(mapStateToProps, { setMonthlyIncome, fetchMonthlyIncome, fetchUsers })(MonthlyIncome)