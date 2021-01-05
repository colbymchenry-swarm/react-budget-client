import React from 'react'
import { connect } from 'react-redux'
import { fetchBudgets } from '../../actions'
import { Link } from 'react-router-dom'

class ListBudgets extends React.Component {
    componentDidMount() {
        this.props.fetchBudgets()
    }

    renderBudgets() {
        if (! this.props.budgets) {
            return <div>Loading...</div>
        }

       return this.props.budgets.map(budget => {
           if (budget.userId === this.props.userId) {
               let fixedClass = budget.fixed ? 'fas fa-check' : 'fas fa-times'
               let fixedStyle = budget.fixed ? { color: 'green' } : { color: 'red' }
            return (
                <tr key={budget.id}>
                    <th scope="row"><Link to={`/budgets/edit/${budget.id}`}>{budget.name}</Link></th>
                    <td>${budget.amount}</td>
                    <td className="text-center"><i className={fixedClass} style={fixedStyle}></i></td>
                </tr>
            )
           }
       })
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <p style={{ marginTop: '4px', height: '8px' }}>Your Budgets</p>
                        </div>
                        <div className="col-6">
                            <Link to="/budgets/create" className="btn btn-primary btn-sm float-right">New Budget</Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col-6">Name</th>
                                <th scope="col-5">Amount</th>
                                <th scope="col-1">Fixed</th>
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
    return { budgets: Object.values(state.budgets), userId: state.auth.userId }
}

export default connect(mapStateToProps, { fetchBudgets })(ListBudgets)

