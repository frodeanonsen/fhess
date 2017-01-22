import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const createLogger = require('redux-logger');
    const logger = createLogger();
    middlewares.push(logger);
}

export default function () {
    const store = createStore(rootReducer, applyMiddleware(...middlewares));
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line global-require
            const nextRootReducer = require('./reducers/').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

