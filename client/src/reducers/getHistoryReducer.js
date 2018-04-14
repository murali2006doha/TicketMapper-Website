
const getUserSearchHistory = (state = { user: "Daniel" }, action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      state = { ...state, name: action.payload.userName }
      break;
    case "SET_USER_AGE":
      state = { ...state, age: action.payload.age }
      break;
    case "CHANGE_FAV_GENRE":
      state = { ...state, favGenre: action.payload }
      break;
    case "FETCH_USERS_PENDING":
      return { ...state, fetching: true }
    case "FETCH_USERS_REJECTED":
      return { ...state, fetching: false, error: action.payload }
    case "FETCH_USERS_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
    default: return state
  }
  return state
}

export default getUserSearchHistory