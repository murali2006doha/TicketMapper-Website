import React, { Component } from "react";
import Event from "../event/event";
import "./eventsList.css"

export default class EventsList extends Component {
  render() {
    return (
      <div>
        <h3 className="eventslist-title">Upcoming {this.props.performer} Events</h3>
        <hr />
        <ul className="eventslist-events">
          {this.props.events.map((event) => {
            return <Event dispatch={this.props.dispatch} history={this.props.history} event={event} performer={this.props.performer} key={event.id} performerID={this.props.performerID} />
          })
          }
        </ul>
      </div>
    );
  }
}