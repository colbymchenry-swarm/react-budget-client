import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom'

class Footer extends React.Component {

    constructor(props) {
        super(props)
        this.navToggleRef = React.createRef()
    }

    clickedLink = () => {
        this.navToggleRef.current.click()
    }

    render() {
        return (
            <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark" style={{ height: '48px' }}>
                <div className="row w-100 text-center" style={{ display: 'block', marginLeft: '0px' }}>
                    <Link to="/transactions/create"><button type="button" className="btn btn-primary btn-circle btn-xl" style={{ marginTop: '-4em' }} ><span style={{ fontSize: '24px' }}><i className="fas fa-plus"></i></span></button></Link>
                </div>
            </nav>
        )
    }
}

export default Footer