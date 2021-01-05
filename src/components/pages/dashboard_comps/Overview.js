import React from 'react'
import { connect } from 'react-redux'
import { fetchBudgets, fetchTransactions, fetchIncomes } from '../../../actions'
import MonthlyIncome from './MonthlyIncome'

class Overview extends React.Component {

    componentDidMount() {
        this.props.fetchBudgets()
        this.props.fetchTransactions()
        this.props.fetchIncomes()
    }

    spendingData() {
        let totalSpending = 0
        let totalBudget = 0;
        let now = new Date()

        this.props.transactions.forEach(transaction => {
            let date = new Date(transaction.date)
            if (date.getMonth() === now.getMonth() && transaction.userId == this.props.userId) {
                totalSpending += parseInt(transaction.amount)
            }
        })

        this.props.budgets.forEach(budget => {
            if (budget.userId == this.props.userId && !budget.fixed) {
                totalBudget += parseInt(budget.amount)
            }
        })

        let percentage = totalSpending / totalBudget
        percentage = percentage === Infinity ? 0 : percentage * 100

        return { totalSpending, totalBudget, percentage }
    }


    daysInThisMonth() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }

    render() {
        let now = new Date()
        let todayPercentage = (now.getDate() / this.daysInThisMonth()) * 100
        let { totalSpending, totalBudget, percentage } = this.spendingData()

        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <p style={{ marginTop: '4px', height: '8px' }}>Overview</p>
                        </div>
                    </div>
                </div>

                <div className="card-body">

                    <MonthlyIncome />

                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="col-10" scope="row">
                                    <span style={{ height: '8px' }}>Your Spending</span>
                                    <br />
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}></div>
                                        <div style={{ width: '2px', height: '20px', position: 'absolute', background: 'black', left: `${todayPercentage}%`, top: '-2px' }}></div>
                                    </div>
                                </th>
                                <td className="col-2">
                                    ${totalSpending}
                                    <br />
                                    <small className="form-text text-muted">${totalBudget}</small>
                                </td>
                            </tr>
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
        incomes: Object.values(state.incomes),
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchBudgets, fetchTransactions, fetchIncomes })(Overview)

