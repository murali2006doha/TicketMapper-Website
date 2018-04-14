import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Label } from "reactstrap";
import Menu from "../../components/menu/menu";
import * as result from "../../actions/resultActions"
import * as follow from "../../actions/followActions"
import { connect } from "react-redux"
import "./followingpage.css"
import * as user from "../../actions/userActions"
import { Redirect } from "react-router-dom";

/*
Returns list of attractions that a user is following.
Clicking on an attraction directs the user to the map page.
*/

class FollowingPage extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(user.sessionCheck());
        this.handleResult = this.handleResult.bind(this);
    }

    handleResult(keyword) {
        this.props.dispatch(result.fetchResult(keyword))
        this.props.history.push(`/mappage/`)
    }
    
    handleUnfollow(user, attractionID, attractionList) {
        var newAttractionList = attractionList.filter(element => element.performerID !== attractionID)
        this.props.dispatch(follow.followPerformer(user, newAttractionList))

    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to='/' />;
        }
        return (
            <div className="followingpage-container">
                <Menu />
                {this.props.attractionList.length === 0 ?
                    <div>
                        <h2 className="followingpage-following-status">No Attractions Followed!</h2>
                    </div> :
                    <div>
                        <Form>
                            <h2 className="followingpage-following-status">Attractions Currently Followed</h2>
                            {Object.values(this.props.attractionList).map(function (attraction) {
                                return (
                                    <div className="followingpage-follow" key={attraction.performerID}>
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
                                                    <Button color="danger" size="sm" onClick={() => this.handleUnfollow(this.props.userID, attraction.performerID, this.props.attractionList)}>Unfollow</Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                )
                            }, this)}
                        </Form>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    attractionList: state.user.userFollowing,
    userID: state.user.userID,
    loggedIn: state.user.loggedIn

})

export default connect(mapStateToProps)(FollowingPage)