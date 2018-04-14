import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return (
      <div>
        <Map google={this.props.google}
          zoom={3}
          onClick={this.onMapClicked}>
          {this.props.events.map((event) => {
            return <Marker onClick={this.onMarkerClick}
              num={event.num}
              key={event.id}
              name={event.title}
              loc={event.loc}
              date={event.date}
              position={{ lat: event.lat, lng: event.lng }} />
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h5>{this.state.selectedPlace.num + ". " + this.state.selectedPlace.name + ": "}</h5>
              <h6>{this.state.selectedPlace.loc}</h6>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCPvTfKWSbj5RpHZyWyke-CQ8CR1sqiDH0")
})(MapContainer)