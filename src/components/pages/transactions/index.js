import React from 'react'
import { connect } from 'react-redux'
import { fetchTransactions, fetchBudget, deleteTransaction } from '../../../actions'
import { Link } from 'react-router-dom'

class ListTransactions extends React.Component {
    componentDidMount() {
        this.props.fetchBudget(this.props.match.params.id)
        this.props.fetchTransactions()
    }

    renderTransactions() {
        if (! this.props.transactions || ! this.props.budget) {
            return <div>Loading...</div>
        }

       return this.props.transactions.map(transaction => {
           if (transaction.budget_id == this.props.match.params.id) {
               let date = new Date(transaction.timestamp)
            return (
                <tr key={transaction.id}>
                    <th scope="row"> <small className="form-text text-muted">{!transaction.description ? 'N/A' : transaction.description}</small></th>
                    <td>${transaction.amount}</td>
                    <td>{date.getDate()}</td>
                    <td onClick={e => this.props.deleteTransaction(transaction.id, this.props.budget.id)}><i class="fas fa-trash" style={{ color: 'red' }}></i></td>
                </tr>
            )
           }
       })
    }

    render() {
        let now = new Date()
        let month = now.toLocaleString('default', { month: 'long' })
        return (
            <React.Fragment>
                <h1>{this.props.budget.name}</h1>
                <h4>{month}, {now.getFullYear()}</h4>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th className="col-7">Description</th>
                            <th className="col-3">Amt</th>
                            <th className="col-1">Day</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransactions()}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
        transactions: Object.values(state.transactions),
        budget: state.budgets[ownProps.match.params.id] 
    }
}

export default connect(mapStateToProps, { fetchBudget, fetchTransactions, deleteTransaction })(ListTransactions)

