import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'
import history from '../history'
import Dashboard from './pages/Dashboard'
import ListBudgets from './pages/ListBudgets'
import CreateBudget from './pages/CreateBudget'
import EditBudget from './pages/EditBudget'
import CreateTransaction from './pages/CreateTransaction'
import CreateIncome from './pages/CreateIncome'

class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <Header />
                    <div className="container" style={{ paddingTop: '2em' }}>
                        <Switch>
                            <PrivateRoute authed={this.props.isSignedIn} path='/dashboard' exact component={Dashboard} />
                            <PrivateRoute authed={this.props.isSignedIn} path="/budgets/list" exact component={ListBudgets} />
                            <PrivateRoute authed={this.props.isSignedIn} path="/budgets/create" exact component={CreateBudget} />
                            <PrivateRoute authed={this.props.isSignedIn} path="/budgets/edit/:id" exact component={EditBudget} />
                            <PrivateRoute authed={this.props.isSignedIn} path="/transactions/create" exact component={CreateTransaction} />
                            <PrivateRoute authed={this.props.isSignedIn} path="/income/create" exact component={CreateIncome} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(App)