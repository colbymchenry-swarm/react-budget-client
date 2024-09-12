import React from 'react'
import { connect } from 'react-redux'
import { deleteBudget, fetchBudgets } from '../../../../actions'

class DeleteBudget extends React.Component {

    constructor(props) {
        super(props)

        this.amountRef = React.createRef()
        this.descriptionRef = React.createRef()

        this.state = {
            selectedBudget: -2
        }
    }

    componentDidMount() {
        this.props.fetchBudgets()
    }

    submitForm = (e) => {
        e.preventDefault()
  
        this.props.deleteBudget(this.props.match.params.id, this.state.selectedBudget)
    }

    handleChange = e => {
        let value = e.target.value;
        this.setState({
            selectedBudget: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.selectedBudget === -2) {
            if (this.props.budgets.length > 0)  {
                let default_budget = this.props.budgets.find(budget => !budget.fixed && parseInt(budget.id) !== parseInt(this.props.match.params.id))
                this.setState({selectedBudget: default_budget === undefined ? -1 : default_budget.id })
            } else {
                this.setState({selectedBudget: -1 })
            }
        }
    }

    render() {
        if (!this.props.budgets) {
            return <div>Loading...</div>
        }

        let dropdown = this.props.budgets.map(budget => {
            if (budget !== undefined && !budget.fixed && parseInt(budget.id) !== parseInt(this.props.match.params.id)) {
                return (
                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                )
            } else return undefined
        })

        return (
            <div className="card">
                <div className="card-header">
                    Delete Budget
                </div>

                <div className="card-body">
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label>Transfer</label>
                            <select className="form-control" onChange={e => this.handleChange(e)}>
                                {dropdown}
                                <option key={-1} value={-1}>Fun Money</option>
                            </select>
                            <small className="form-text text-muted">Transfer all transactions this month to this budget.</small>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return { budgets: Object.values(state.budgets), userId: state.auth.userId }
}

export default connect(mapStateToProps, { deleteBudget, fetchBudgets })(DeleteBudget)