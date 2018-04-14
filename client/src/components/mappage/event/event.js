import React, { Component } from "react";
import { Button } from "reactstrap";
import "./event.css"
import * as event from "../../../actions/eventActions"

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //Clicking on an event directs user to page displaying further details 
  handleSearch(eventID, performerID) {
    var that = this;
    return function () {
      that.props.dispatch(event.fetchEvent(performerID + "&" + eventID))
      that.props.history.push(`/eventdetailspage/`)
    }
  }

  render() {
    return (
      <div className="event-container">
        <li className="event-title">{this.props.event.num + ". " + this.props.event.title}</li>
        <li className="event-info">{this.props.event.loc}</li>
        <li className="event-info">{this.props.event.date}</li>
        <Button className="event-btn" color="primary" onClick={this.handleSearch(this.props.event.id, this.props.performerID)}>More Information</Button>
        <hr />
      </div>
    );
  }
}