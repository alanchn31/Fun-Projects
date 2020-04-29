import fetchHelloWorld from '../api/mockApi'
import * as actionTypes from './actionTypes'
/* 
The rootActions will call an api to get a result. Once result is received, we return an action.type and a value
for the reducer to handle (pressReducer).
*/

export function asynLoadHelloWorld(){
    fetchHelloWorld()
    return {
        type: actionTypes.PRESSBUTTON
    }
}
