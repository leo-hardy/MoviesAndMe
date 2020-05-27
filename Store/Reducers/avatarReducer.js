
// default image
const initialState = { avatar: require('../../Images/ic_tag_faces.png') }


function setAvatar(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CHANGE_PICTURE':
            nextState = {
                ...state,
                avatar: action.value
              }
            return nextState || state
        default:
            return state
    }
}

export default setAvatar