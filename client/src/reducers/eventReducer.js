const initialState = {
  artists: "",
  priceRange: "",
  name: "",
  url: "",
  date: "",
  time: "",
  location: "",
  venue: "",
  image: "",
  description: "",
  performerID: "",
  fetching: false,
  fetched: true,
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENT_PENDING":
      return { ...state, fetching: true }
    case "FETCH_EVENT_REJECTED":
      return { ...state, fetching: false, error: action.payload }
    case "FETCH_EVENT_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        artists: action.payload.data.artists,
        priceRange: action.payload.data.priceRange,
        name: action.payload.data.name,
        url: action.payload.data.url,
        date: action.payload.data.date,
        time: action.payload.data.time,
        location: action.payload.data.location,
        venue: action.payload.data.venue,
        image: action.payload.data.image,
        description: action.payload.data.description,
        performerID: action.payload.data.performerID
      }
    default: return state;
  }
}

export default eventReducer