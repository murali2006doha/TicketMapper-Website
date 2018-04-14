const followReducer = (state = {}, action) => {
  switch (action.type) {
    case "FOLLOW_PENDING":
      return { ...state, fetching: true }
    case "FOLLOW_REJECTED":
      return { ...state, fetching: false }
    case "FOLLOW_FUFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
      }
    default: return state;
  }
}

export default followReducer