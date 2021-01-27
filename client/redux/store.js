import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;


const reduxStore = createStore(

  rootReducer,
  composeEnhancers(applyMiddleware(thunk))

);

export default reduxStore; 