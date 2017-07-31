import * as types from '../constants/actionTypes';
import initialState from './initialState';

 export const eventsReducer = (state = initialState.events, action) => {
  switch (action.type) {
    // case 'FETCH_EVENTS_SUCCESS':
    //     return [
    //       ...state,
    //       Object.assign({}, action.events)
    //     ];
      case types.FETCH_EVENTS_SUCCESS:
      // console.log("EVETNS", action.events)
            return action.events.data;
      default:
            return state;
  }
};

export const coordinatesReducer = (state = initialState.coordinates, action) => {
    switch(action.type){
      case types.SELECT_EVENTS_SUCCESS:
            // console.log("REDUCER", action.coordinates);
       return action.coordinates;
      default:
            return state;
    }
};

