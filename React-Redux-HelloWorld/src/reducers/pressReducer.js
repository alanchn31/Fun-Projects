const defaultState = {
    buttonPressed: false
}

const pressReducer = (state = defaultState,action) => {
    switch(action.type){
        case "PRESSBUTTON":
            return Object.assign({}, state, {buttonPressed: !state.buttonPressed})
        default:
            return state;
        
    }
}

export default pressReducer