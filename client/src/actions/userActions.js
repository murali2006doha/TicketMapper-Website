import axios from "axios"

export function userSignup(userInfo) {
  return function (dispatch) {
    dispatch({
      type: "USER_SIGNUP",
      payload: axios.post("/signup", userInfo)
    })
  }
}

export function userSignout() {
  return function (dispatch) {
    dispatch({
      type: "USER_SIGNOUT",
      payload: axios.get("/signout")
    })
  }
}

export function userSignin(userInfo) {
  return function (dispatch) {
    dispatch({
      type: "USER_LOGIN",
      payload: axios.post("/login", userInfo)
    })
  }
}

export function userDelete(userID) {
  return function (dispatch) {
    dispatch({
      type: "USER_DELETE",
      payload: axios.delete("/users/" + userID)
    })
  }
}

export function fetchUser(user) {
  return function (dispatch) {
    dispatch({
      type: "FETCH_USERS",
      payload: axios.get("/user/" + user)
    })
  }
}

export function sessionCheck() {
  const request = axios.get("/session")
  return function (dispatch) {
    dispatch({
      type: "SESSION_CHECK",
      payload: request
    })
  }
}