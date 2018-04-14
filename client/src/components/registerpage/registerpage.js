import React, { Component } from "react";
import { Alert, Button, Input, Form, FormGroup } from "reactstrap";
import "./registerpage.css"
import { connect } from "react-redux"
import * as user from "../../actions/userActions"

/*
User can input email address and password and should be redirected to homepage.
*/

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInputValue: "",
            usernameInputValue: "",
            passwordInputValue: "",
            confirmPasswordInputValue: "",
            dobInputValue: ""
        };
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSignUp() {
        function validateEmail(email) {
            var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (this.state.nameInputValue === "") {
            window.alert("Please enter your name.")
        } else if (validateEmail(this.state.usernameInputValue) !== true) {
            window.alert("Please enter a valid email address.")
        } else if (this.state.passwordInputValue.length < 6) {
            window.alert("Please make sure your password is at least 6 characters.")
        } else if (this.state.confirmPasswordInputValue !== this.state.passwordInputValue) {
            window.alert("Please confirm your password correctly")
        } else if (/^\d+$/.test(this.state.dobInputValue[0, 3]) === false &&
            /^\d+$/.test(this.state.dobInputValue[5, 6]) === false &&
            /^\d+$/.test(this.state.dobInputValue[8, 9]) === false) {
            window.alert("Please enter a valid date of birth")
        } else {
            let userInfo = {
                name: this.state.nameInputValue,
                password: this.state.passwordInputValue,
                email: this.state.usernameInputValue,
                dob: this.state.dobInputValue
            }
            this.props.dispatch(user.userSignup(userInfo))
            if (this.props.signupFail === true) {
                setTimeout(function () { this.props.dispatch({ type: "SIGN_UP_FAIL_BAR_COMPLETE" }) }.bind(this), 3000);
            } else {
                this.props.history.push("/")
            }
        }
    }

    handleBack() {
        this.props.history.push(`/`)
    }

    // Allows submission upon pressing enter
    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleSignUp()
        }
    }

    updateNameInputValue(nameEvt) {
        this.setState({
            nameInputValue: nameEvt.target.value
        });
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

    updateConfirmPasswordInputValue(confirmPasswordEvt) {
        this.setState({
            confirmPasswordInputValue: confirmPasswordEvt.target.value
        });
    }

    updateDOBInputValue(dobEvt) {
        this.setState({
            dobInputValue: dobEvt.target.value
        });
    }

    componentDidMount() {
        setTimeout(function () { this.props.dispatch({ type: "SIGN_UP_FAIL_BAR_COMPLETE" }) }.bind(this), 3000);
    }

    render() {
        return (
            <div className="register-container">
                <h1 className="display-4 register-display-4">TicketMapper</h1>
                <p className="lead register-lead">Find and track events from your favourite musical artists, sports teams and more</p>
                {this.props.signupFail === false ? "" : <Alert className="alert" color="danger">
                    Server Error, Please Try Again
                </Alert>}
                {this.props.emailError === false ? "" : <Alert className="alert" color="info">
                    This email address has already been registered
                </Alert>}
                <div className="register-inputs">
                    <Form>
                        <FormGroup>
                            <Input className="register-name" bsSize="md" placeholder="Name"
                                value={this.state.nameInputValue} onKeyPress={this.handleKeyPress} onChange={nameEvt => this.updateNameInputValue(nameEvt)} />
                        </FormGroup>
                        <FormGroup>
                            <Input className="register-username" type="email" bsSize="md" placeholder="Email Address"
                                value={this.state.userNameinputValue} onKeyPress={this.handleKeyPress} onChange={usernameEvt => this.updateUsernameInputValue(usernameEvt)} />
                        </FormGroup>
                        <FormGroup>
                            <Input className="register-password" type="password" bsSize="md" placeholder="Password"
                                value={this.state.passwordInputValue} onKeyPress={this.handleKeyPress} onChange={passwordEvt => this.updatePasswordInputValue(passwordEvt)} />
                        </FormGroup>
                        <FormGroup>
                            <Input className="register-confirm-password" type="password" bsSize="md" placeholder="Confirm Password"
                                value={this.state.confirmPasswordinputValue} onKeyPress={this.handleKeyPress} onChange={confirmPasswordEvt => this.updateConfirmPasswordInputValue(confirmPasswordEvt)} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="date" className="register-dob" bsSize="md" default="Date of Birth"
                                value={this.state.dobInputValue} onKeyPress={this.handleKeyPress} onChange={dobEvt => this.updateDOBInputValue(dobEvt)} />
                        </FormGroup>
                        <Button className="register-signup-btn" color="primary" size="md" onClick={this.handleSignUp}>Sign Up</Button>
                        <Button className="register-signin-btn" color="secondary" size="md" onClick={this.handleBack}>Back</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signupFail: state.user.signupFail,
    emailError: state.user.emailError,
    signupFailMessage: state.user.signupFailMessage,
})

export default connect(mapStateToProps)(RegisterPage)