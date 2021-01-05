import { map } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { editBudget, fetchBudget, deleteBudget } from '../../../../actions'

class EditBudget extends React.Component {
    state = {
        name: '',
        amount: 0,
        fixed: false,
        synced: false
    }

    componentDidMount() {
        this.props.fetchBudget(this.props.match.params.id)
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.synced) {
            return {
                name: props.budget.name,
                amount: props.budget.amount,
                fixed: props.budget.fixed,
                synced: true
            }
        } else {
            return state
        }
    }

    submitForm = (e) => {
        e.preventDefault()
  
        let formValues = {
            name: this.state.name,
            amount: this.state.amount,
            fixed: this.state.fixed
        }

        this.props.editBudget(this.props.budget.id, formValues)
    }

    deleteBudget = () => {
        this.props.deleteBudget(this.props.budget.id)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <p style={{ marginTop: '4px', height: '8px' }}>Edit Budget</p>
                        </div>
                        <div className="col-6">
                            <button type="button" className="btn btn-danger btn-sm float-right" onClick={this.deleteBudget}>Delete</button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter name for budget" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="currency" className="form-control" placeholder="$50.00" value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />
                            <small className="form-text text-muted">This is on a per month basis.</small>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" checked={this.state.fixed} onChange={e => this.setState({ fixed: e.target.checked })} />
                            <label className="form-check-label">Fixed</label>
                            <small className="form-text text-muted">Is this going to be the same amount every month? (Ex: Rent, Car Insurance)</small>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Save</button>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return { budget: state.budgets[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { editBudget, fetchBudget, deleteBudget })(EditBudget)