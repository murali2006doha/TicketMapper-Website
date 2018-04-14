import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import HomePage from "./homepage/homepage";
import RegisterPage from "./registerpage/registerpage";
import SearchPage from "./searchpage/searchpage";
import ResultPage from "./resultpage/resultpage";
import FollowingPage from "./followingpage/followingpage";
import MapPage from "./mappage/mappage";
import EventDetailsPage from "./eventdetailspage/eventdetailspage";
import "bootstrap/dist/css/bootstrap.css";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/searchpage/" component={SearchPage} />
        <Route path="/registerpage/" component={RegisterPage} />
        <Route path="/mappage/" component={MapPage} />
        <Route path="/resultpage/" component={ResultPage} />
        <Route path="/following/" component={FollowingPage} />
        <Route path="/eventdetailspage/" component={EventDetailsPage} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root