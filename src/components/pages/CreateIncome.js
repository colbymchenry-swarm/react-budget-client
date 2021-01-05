import React from 'react'
import { connect } from 'react-redux'
import { createIncome } from '../../actions'

class CreateIncome extends React.Component {

    constructor(props) {
        super(props)

        this.descRef = React.createRef()
        this.amountRef = React.createRef()
    }

    submitForm = (e) => {
        e.preventDefault()
  
        let formValues = {
            name: this.descRef.current.value,
            amount: this.amountRef.current.value,
        }

        this.props.createIncome(formValues)
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Add Income
                </div>

                <div className="card-body">
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" ref={this.descRef} className="form-control" placeholder="Enter description for income" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="currency" ref={this.amountRef} className="form-control" placeholder="$50.00" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default connect(null, { createIncome })(CreateIncome)