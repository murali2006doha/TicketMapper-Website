import axios from "axios"

export function fetchEvent(search) {
  return function (dispatch) {
    dispatch({
      type: "FETCH_EVENT",
      payload: axios.get("/eventDetailsPage/" + search).catch(function (err) {
        dispatch({
          type: "FOO_REJECTED",
          payload: err
        })
      })
    })
  }
}