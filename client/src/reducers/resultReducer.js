const initialState = {
  eventList: [],
  performer: "",
  performerID: "",
  fetching: false,
  fetched: true,
}

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RESULT_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "FETCH_RESULT_REJECTED":
      return { ...state, fetching: false, fetched: false, error: action.payload }
    case "FETCH_RESULT_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        eventList: action.payload.data.events,
        performer: action.payload.data.performer,
        performerID: action.payload.data.performerID
      }
    default: return state;
  }
}

export default resultReducer