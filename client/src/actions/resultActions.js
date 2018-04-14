import axios from "axios"

export function fetchResult(search) {
  return function (dispatch) {
    dispatch({
      type: "FETCH_RESULT",
      payload: axios.get("/mappage/" + search)
    })
  }
}