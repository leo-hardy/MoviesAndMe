const initialState = { myMovies: [] }

// on initialise le reducer avec le initialState
function toggleSeen(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_SEEN':
      const myMoviesIndex = state.myMovies.findIndex(item => item.id === action.value.id)
      if (myMoviesIndex !== -1) {
        nextState = {
          ...state,
          myMovies: state.myMovies.filter( (item, index) => index !== myMoviesIndex)
        }
      }
      else {
        nextState = {
          ...state,
          myMovies: [...state.myMovies, action.value]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleSeen