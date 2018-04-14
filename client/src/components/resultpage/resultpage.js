import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Label } from "reactstrap";
import Menu from "../../components/menu/menu";
import { connect } from "react-redux"
import * as user from "../../actions/userActions"
import * as result from "../../actions/resultActions"
import * as follow from "../../actions/followActions"
import "./resultpage.css"
import { Redirect } from "react-router-dom";

/*
Returns a list of attractions that match the keyword from the seach page.
Clicking on an attraction directs the user to the map page.
*/

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(user.sessionCheck());
    this.handleResult = this.handleResult.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.checkExists = this.checkExists.bind(this);
  }

  handleResult(keyword) {
    this.props.dispatch(result.fetchResult(keyword))
    this.props.history.push(`/mappage/`)
  }

  handleFollow(user, performerID, performer, userFollowing, eventCount) {
    var newUserFollowing = userFollowing.slice(0)
    newUserFollowing.push({ "performerID": performerID, "performer": performer, "upcomingEvents": eventCount })
    this.props.dispatch(follow.followPerformer(user, newUserFollowing))
  }

  handleUnfollow(user, performerID, userFollowing) {
    var newAttractionList = userFollowing.filter(element => element.performerID !== performerID)
    this.props.dispatch(follow.followPerformer(user, newAttractionList))
  }

  checkExists(userFollowing, attraction) {
    var loc = userFollowing.find(function (element) {
      return element.performerID === attraction.performerID;
    });
    if (loc !== undefined) {
      return <Button color="danger" size="sm" onClick={() => this.handleUnfollow(this.props.userName, attraction.performerID, this.props.userFollowing)}>Unfollow</Button>;
    } else {
      return <Button color="secondary" size="sm" onClick={() => this.handleFollow(this.props.userName, attraction.performerID, attraction.performer, this.props.userFollowing, attraction.upcomingEvents)}>Follow</Button>;
    }
  }

  showResults(props) {
    if (props.attractionList.length !== 0) {
      return <Form>
        <h4 className="title"> Search Results for {'"' + this.props.search + '"'}</h4>
        {Object.values(props.attractionList).map(function (attraction) {
          return (
            <div className="resultpage-result" key={attraction.performerID}>
              <Container>
                <Row>
                  <Col xs="4">
                    <Label>{attraction.performer}</Label>
                  </Col>
                  <Col xs="4">
                    <Label>Upcoming Events: {attraction.upcomingEvents}</Label>
                  </Col>
                  <Col xs="2">
                    <Button color="primary" size="sm" onClick={() => this.handleResult(attraction.performerID)}>View Map</Button>
                  </Col>
                  <Col xs="2">
                    {this.checkExists(props.userFollowing, attraction)}
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }, this)}
      </Form>
    } else {
      return <Form>
        <h1> No Results Found! </h1>
      </Form>
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className="resultpage-container">
        <Menu />
        <div>
          {this.props.fetched === false ? "Loading..." :
            this.showResults(this.props)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  attractionList: state.search.attractionList,
  search: state.search.search,
  userName: state.user.userID,
  userFollowing: state.user.userFollowing,
  loggedIn: state.user.loggedIn,
  fetched: state.search.fetched
})

export default connect(mapStateToProps)(ResultPage)