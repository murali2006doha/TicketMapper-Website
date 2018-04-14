import React, { Component } from "react";
import { Alert, Button, Input, Form, FormGroup } from "reactstrap";
import { connect } from "react-redux"
import "./homepage.css"
import * as user from "../../actions/userActions"
import { Redirect } from "react-router-dom";

/*
Displays home page with option to sign in or sign up.
*/

class NewHomePage extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch({ type: "INIT" });
        this.state = {
            usernameInputValue: "",
            passwordInputValue: "",
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSignup() {
        this.props.history.push("/registerpage")
    }

    handleSignIn() {
        function validateEmail(email) {
            var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (validateEmail(this.state.usernameInputValue) !== true) {
            window.alert("Please enter a valid email address.")
        } else if (this.state.passwordInputValue.length < 6) {
            window.alert("Please make sure your password is at least 6 characters.")
        } else {
            let userInfo = {
                email: this.state.usernameInputValue,
                password: this.state.passwordInputValue
            }
            this.props.dispatch(user.userSignin(userInfo))
            if (this.props.loginSuccess === true) {
                this.props.history.push("/searchpage/")
            } else {
                setTimeout(function () { this.props.dispatch({ type: "SIGN_IN_FAIL_BAR_COMPLETE" }) }.bind(this), 3000);
            }
        }
    }

    updateUsernameInputValue(usernameEvt) {
        this.setState({
            usernameInputValue: usernameEvt.target.value
        });
    }

    updatePasswordInputValue(passwordEvt) {
        this.setState({
            passwordInputValue: passwordEvt.target.value
        });
    }

    //Allows submission upon pressing enter
    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleSignIn()
        }
    }

    render() {
        if (this.props.loginSuccess) {
            return <Redirect to='/searchpage/' />;
        }
        return (
            <div className="home-container">
                {this.props.signupSuccess === false ? "" : <Alert className="alert" color="success">
                    Account Successfully Created!
                </Alert>}
                {this.props.loginFail === false ? "" : <Alert className="alert" color="danger">
                    {this.props.loginFailMessage}
                </Alert>}

                <h1 className="display-4 home-display-4">TicketMapper</h1>
                <p className="lead home-lead">Find and track events from your favourite musical artists, sports teams and more</p>
                <div className="home-inputs">
                    <Form>
                        <FormGroup>
                            <Input className="home-username" type="email" bsSize="md" placeholder="Email Address"
                                value={this.state.userNameinputValue} onKeyPress={this.handleKeyPress} onChange={usernameEvt => this.updateUsernameInputValue(usernameEvt)} />
                        </FormGroup>
                        <FormGroup>
                            <Input className="home-password" type="password" bsSize="md" placeholder="Password"
                                value={this.state.passwordinputValue} onKeyPress={this.handleKeyPress} onChange={passwordEvt => this.updatePasswordInputValue(passwordEvt)} />
                        </FormGroup>
                        <Button className="home-signin-btn" color="primary" size="md" onClick={this.handleSignIn}>Sign In</Button>
                        <Button className="home-signup-btn" color="secondary" size="md" onClick={this.handleSignup}>Sign Up</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signupSuccess: state.user.signupSuccess,
    loginSuccess: state.user.loginSuccess,
    loginFail: state.user.loginFail,
    loginFailMessage: state.user.loginFailMessage,
    deleteSuccess: state.user.deleteSuccess
})

export default connect(mapStateToProps)(NewHomePage)