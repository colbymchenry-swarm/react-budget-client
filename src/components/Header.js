import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.navToggleRef = React.createRef()
    }

    clickedLink = () => {
        this.navToggleRef.current.click()
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                <button className="navbar-toggler" ref={this.navToggleRef} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">
                            <Link to="/dashboard" className="nav-link" onClick={this.clickedLink}>Dashboard</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/budgets/list" className="nav-link" onClick={this.clickedLink}>Budgets</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/income/create" className="nav-link" onClick={this.clickedLink}>Add Income</Link>
                        </li> */}
                        <li className="nav-item">
                            <GoogleAuth />
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header