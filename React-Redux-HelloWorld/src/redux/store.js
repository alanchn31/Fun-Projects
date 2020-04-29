import { createStore, applyMiddleware, compose} from 'redux'
import { once } from 'lodash'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

//Initialize the store to manage states

function createInstance(initialState={}){
    console.log('getStore should be called only once')
    _store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f)
    );
    subscribe()
    return _store
}

const getStore = once(createInstance)

function subscribe(){
    _store.subscribe((state) => {
        window.uiState = _store.getState
    })
}

let _store = {}

export{
    getStore
}
