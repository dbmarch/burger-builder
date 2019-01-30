import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
})
const logger = store => {
	return next => {
		return action => {
			console.log('[Middleware] Dispatching ', action)
			const result = next(action)
			console.log('[Middleware] next state ', store.getState())
			return result
		}
	}
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
