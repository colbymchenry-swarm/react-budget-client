import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class LoginPage extends React.Component {
    
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '796436243816-4tn6f3l2q9h0ntuaraq19p8bme80t03t.apps.googleusercontent.com',
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
                <button className="btn btn-social btn-lg btn-google" style={{ width: 'auto' }} onClick={this.onSignOutClick}>
                    <i className="fab fa-google-plus-g" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="btn btn-social btn-lg btn-google" style={{ width: 'auto' }} onClick={this.onSignInClick}>
                    <i className="fab fa-google-plus-g" />
                    Sign In
                </button>
            )
        }
    }

    render() {
        return (
            <div className="row" style={{ paddingTop: '30vh'}}>
                <div className="col-12 text-center">
                    {this.renderAuthButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(LoginPage)