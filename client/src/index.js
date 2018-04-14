import React from 'react'
import ReactDOM from "react-dom";
import Root from './components/root'
import store from "./store.js"

ReactDOM.render(<Root store={store} />, document.getElementById("root"));