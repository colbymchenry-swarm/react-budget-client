import React from 'react'
import { connect } from 'react-redux'
import { createBudget } from '../../../../actions'

class CreateBudget extends React.Component {

    constructor(props) {
        super(props)

        this.nameRef = React.createRef()
        this.amountRef = React.createRef()
        this.fixedRef = React.createRef()
    }

    submitForm = (e) => {
        e.preventDefault()
  
        let formValues = {
            name: this.nameRef.current.value,
            amount: this.amountRef.current.value,
            fixed: this.fixedRef.current.checked
        }

        this.props.createBudget(formValues)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Create Budget
                </div>

                <div className="card-body">
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" ref={this.nameRef} className="form-control" placeholder="Enter name for budget" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="currency" ref={this.amountRef} className="form-control" placeholder="$50.00" />
                            <small className="form-text text-muted">This is on a per month basis.</small>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" ref={this.fixedRef} className="form-check-input" />
                            <label className="form-check-label">Fixed</label>
                            <small className="form-text text-muted">Is this going to be the same amount every month? (Ex: Rent, Car Insurance)</small>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default connect(null, { createBudget })(CreateBudget)