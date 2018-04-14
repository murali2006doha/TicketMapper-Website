import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Menu from "../../components/menu/menu";
import "./eventdetailspage.css"
import { connect } from "react-redux"
import * as user from "../../actions/userActions"
import { Redirect } from "react-router-dom";

/*
Displays details for the event selected from the map page.
*/

class EventDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(user.sessionCheck());
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.history.push(`/mappage/`)
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/' />;
    }
    return (
      <div className="eventdetails-container">
        <Menu />
        <Button className="btn-block btn-md" color="primary" onClick={this.handleBack}>Back To Map</Button>{' '}
        <Container className="eventdetails-inner-container">
          <Row>
            <Col xs="6">
              <ul className="eventdetails-details">
                <li className="eventdetails-tourname">
                  {this.props.name}
                </li>
                <hr className="hr-title"></hr>
                <li>
                  <h4>Attractions</h4>
                  {this.props.artists}
                </li>
                <li>
                  <h4>Date</h4>
                  {this.props.date}
                </li>
                <li>
                  <h4>Venue</h4>
                  {this.props.venue}
                </li>
                <li>
                  <h4>Location</h4>
                  {this.props.location}
                </li>
                <li>
                  <h4>Price Range</h4>
                  {this.props.priceRange}
                </li>
                <li>
                  <h4>Description</h4>
                  {this.props.description}
                </li>
                <li>
                  <Button color="primary" href={this.props.url}>Buy Tickets</Button>
                </li>
              </ul>
            </Col>
            <Col xs="6">
              <img className="eventdetails-img" alt="event graphic" src={this.props.image} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  artists: state.event.artists,
  priceRange: state.event.priceRange,
  name: state.event.name,
  url: state.event.url,
  date: state.event.date,
  time: state.event.time,
  location: state.event.location,
  venue: state.event.venue,
  image: state.event.image,
  description: state.event.description,
  performerID: state.event.performerID,
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(EventDetailsPage)