import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '796436243816-ba8medgv55sdbf3j1761pc1og0r18o44.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button className="btn btn-block btn-social btn-lg btn-google float-right btn-sm" style={{ width: 'auto' }} onClick={this.onSignOutClick}>
                    <i className="fab fa-google-plus-g" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="btn btn-block btn-social btn-lg btn-google float-right btn-sm" style={{ width: 'auto' }} onClick={this.onSignInClick}>
                    <i className="fab fa-google-plus-g" />
                    Sign In
                </button>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderAuthButton()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)