import { connect } from 'react-redux'
import HelloWorld from './components/HelloWorld'
import {asynLoadHelloWorld} from './actions/rootActions'

const mapStateToProps = (state) => {
    return state;    
}

const mapDispatchToProps = (dispatch) => {
    return{    
        fetchHello: () => {
            dispatch(asynLoadHelloWorld())
        },
    }
}

const HelloWorldContainer = connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
export default HelloWorldContainer