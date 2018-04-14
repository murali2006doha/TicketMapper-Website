import React, { Component } from "react";
import { NavbarBrand, Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import "./menu.css"
import * as user from "../../actions/userActions"
import { Redirect } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      signout: false
    };
    this.signout = this.signout.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  signout() {
    this.state.signout = true
    this.props.dispatch(user.userSignout());
  }

  deleteAccount() {
    this.state.signout = true
    this.props.dispatch(user.userSignout());
    this.props.dispatch(user.userDelete(this.props.userID));
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    if (this.state.signout) {
      return <Redirect to='/' />;
    }
    return (
      <div className="menu-container">
        <Navbar light expand="md">
          <NavbarBrand tag={Link} to="/">TicketMapper</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/searchpage/">Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/following/">Following</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/" onClick={this.signout}>Sign Out</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="menu-delete" tag={Link} to="/" onClick={this.deleteAccount}>Delete Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="menu-name">{this.props.userName}</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.userName,
  userID: state.user.userID
})

export default connect(mapStateToProps)(Menu)