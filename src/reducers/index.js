import { combineReducers } from 'redux';
import {eventsReducer,coordinatesReducer} from './eventsReducer';
import { townsReducer, townReducer } from './townsReducer';
import { stopsReducer } from './stopsReducer';
import { storesReducer } from './storesReducer';

const rootReducer = combineReducers({

   events: eventsReducer,
   coordinates: coordinatesReducer,
   towns: townsReducer,
   townpos: townReducer,
   stops: stopsReducer,
   stores: storesReducer

});
export default rootReducer;