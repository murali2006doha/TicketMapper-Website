const initialState = {
  signupSuccess: false,
  loginFail: false,
  loginSuccess: false,
  loginSuccessMessage: "",
  signupFail: false,
  signupFailMessage: "",
  emailError: false,
  fetching: false,
  fetched: false,
  userData: null,
  loggedIn: true,
  deleteSuccess: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT":
      return { ...initialState }
    case "FETCH_USERS_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "FETCH_USERS_REJECTED":
      return { ...state, fetching: false, error: action.payload }
    case "FETCH_USERS_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        name: action.payload.data.userName
      }
    case "USER_LOGIN_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "USER_LOGIN_REJECTED":
      return { ...state, fetching: false, loginFail: true, loginFailMessage: action.payload.response.data.message }
    case "USER_LOGIN_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        loginSuccess: true,
        loginSuccessMessage: action.payload.message,
        userCookie: action.payload.cookie,
        userData: action.payload.data,
        userName: action.payload.data.name,
        userFollowing: action.payload.data.following,
        userSearchHistory: action.payload.data.searchHistory,
        userID: action.payload.data._id,
        userEmail: action.payload.data.email
      }
    case "USER_SIGNUP_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "USER_SIGNUP_REJECTED":
      return { ...state, fetching: false, signupFail: true, signupFailMessage: action.payload }
    case "USER_SIGNUP_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        signupSuccess: true
      }
    case "SIGN_UP_SUCCESS_BAR_COMPLETE":
      return {
        ...state,
        signupSuccess: false,
      }
    case "SIGN_UP_FAIL_BAR_COMPLETE":
      return {
        ...state,
        signupFail: false,
      }
    case "SIGN_IN_FAIL_BAR_COMPLETE":
      return {
        ...state,
        loginFail: false,
      }
    case "SIGN_IN_SUCCESS_BAR_COMPLETE":
      return {
        ...state,
        loginSuccess: false,
      }
    case "EMAIL_FAIL_BAR_COMPLETE":
      return {
        ...state,
        emailError: false,
      }
    case "SESSION_CHECK_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "SESSION_CHECK_REJECTED":
      return { ...state, loggedIn: false }
    case "SESSION_CHECK_FULFILLED":
      return {
        ...state,
        userData: action.payload.data,
        userName: action.payload.data.name,
        userFollowing: action.payload.data.following,
        userSearchHistory: action.payload.data.searchHistory,
        userID: action.payload.data._id,
        userEmail: action.payload.data.email
      }
    case "USER_SIGNOUT_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "USER_SIGNOUT_REJECTED":
      return { ...state }
    case "USER_SIGNOUT_FULFILLED":
      return {
        ...state, loggedIn: false
      }
    case "USER_DELETE_PENDING":
      return { ...state, fetching: true }
    case "USER_DELETE_REJECTED":
      return { ...state, fetching: false }
    case "USER_DELETE_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        deleteSuccess: true
      }
    case "UPDATE_STORE":
      return {
        ...state,
        userFollowing: action.payload
      }
    default: return state;

  }
}

export default userReducer