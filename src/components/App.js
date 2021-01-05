import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './Header'
import history from '../history'
import Dashboard from './pages/dashboard'
import ListBudgets from './pages/budgets'
import CreateBudget from './pages/budgets/create'
import EditBudget from './pages/budgets/edit'
import CreateTransaction from './pages/transactions/create'

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