import React from 'react'
import { connect } from 'react-redux'
import { fetchBudgets, fetchTransactions } from '../../../../actions'
import { Link } from 'react-router-dom'

class ListBudgets extends React.Component {
    componentDidMount() {
        this.props.fetchBudgets()
        this.props.fetchTransactions()
    }

    budgetData(budget) {
        let totalSpent = 0
        let now = new Date()

        this.props.transactions.forEach(transaction => {
            let date = new Date(transaction.timestamp)
            if (date.getMonth() === now.getMonth() && parseInt(transaction.budget_id) === parseInt(budget.id)) {
                    totalSpent += parseInt(transaction.amount)
            }
        })

        let percentage = totalSpent / parseInt(budget.amount)
        percentage = percentage === Infinity ? 0 : percentage * 100

        return { percentage, totalSpent }
    }


    daysInThisMonth() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
      }

    renderBudgets() {
        if (! this.props.budgets) {
            return <div>Loading...</div>
        }

        let todayPercentage = (new Date().getDate() / this.daysInThisMonth()) * 100

       return this.props.budgets.map(budget => {
            if(budget.id === undefined) return undefined

           if (!budget.fixed) {
               let { percentage, totalSpent } = this.budgetData(budget)
            return (
                <tr key={budget.id}>
                    <th scope="row">
                        <span style={{ height: '8px' }}><Link to={`/transactions/view/${budget.id}`}>{budget.name}</Link></span>
                        <br />
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}></div>
                            <div style={{ width: '2px', height: '20px', position: 'absolute', background: 'black', left: `${todayPercentage}%`, top: '-2px' }}></div>
                        </div>
                    </th>
                    <td>
                        ${totalSpent}
                        <br />
                        <small className="form-text text-muted">${budget.amount}</small>
                    </td>
                </tr>
            )} else return undefined
       })
    }

    render() {
        let now = new Date()
        let month = now.toLocaleString('default', { month: 'long' })
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <p style={{ marginTop: '4px', height: '8px' }}>Activity</p>
                        </div>
                        <div className="col-6">
                            <Link to="/transactions/create" className="btn btn-primary btn-sm float-right">New Transaction</Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th className="col-10">{month}</th>
                                <th className="col-2">{now.getFullYear()}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBudgets()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        budgets: Object.values(state.budgets), 
        transactions: Object.values(state.transactions),
        userId: state.auth.userId 
    }
}

export default connect(mapStateToProps, { fetchBudgets, fetchTransactions })(ListBudgets)

