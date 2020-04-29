import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { getStore } from './redux/store'
import registerServiceWorker from './registerServiceWorker'


const myReduxStore = getStore()

ReactDOM.render(
    <Provider store={myReduxStore}>
        <App />
    </Provider>, document.getElementById('root')
);

registerServiceWorker();