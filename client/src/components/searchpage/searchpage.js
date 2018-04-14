import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Container, Row, Button, Input } from "reactstrap";
import Menu from "../../components/menu/menu";
import "./searchpage.css"
import * as search from "../../actions/searchActions"
import { connect } from "react-redux"
import * as user from "../../actions/userActions"
import { Redirect } from "react-router-dom";

/*
User can input a search query for an attraction in the search bar. 
User should be redirected to the results page.
*/

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(user.sessionCheck());
    this.state = {
      inputValue: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //Sends search request to result page
  handleSearch() {
    this.props.dispatch(search.fetchSearch(this.state.inputValue))
    if (this.state.inputValue !== "") {
      this.props.history.push(`/resultpage/`)
    }
  }

  //Updates input value onChange
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  // Allows submission upon pressing enter
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSearch()
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className="search-container">
        <Menu />
        <Container>
          <h2 className="search-text h2">What would you like to search for?</h2>
          <Row>
            <div className="search-inputs">
              <InputGroup>
                <Input placeholder="E.g. The Weeknd, Chelsea FC, Cirque du Soleil" bsSize="md"
                  value={this.state.inputValue} onKeyPress={this.handleKeyPress} onChange={evt => this.updateInputValue(evt)} />
                <InputGroupAddon addonType="append" >
                  <Button color="primary" size="md" onClick={this.handleSearch}>Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.name,
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(SearchPage)