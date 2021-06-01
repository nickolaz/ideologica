import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { homeReducer } from '../reducers/home';

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    home :      homeReducer
});

export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
    // para publicar, comentar el de arriba
    // applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof reducers>
