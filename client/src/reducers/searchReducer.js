const initialState = {
  attractionList: [],
  attractionEmpty: 0,
  fetching: false,
  fetched: false,
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SEARCH_PENDING":
      return { ...state, fetching: true, fetched: false }
    case "FETCH_SEARCH_REJECTED":
      return { ...state, fetching: false, fetched: false, error: action.payload }
    case "FETCH_SEARCH_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        attractionList: action.payload.data.attractions,
        search: action.payload.data.search
      }
    default: return state;
  }
}

export default searchReducer