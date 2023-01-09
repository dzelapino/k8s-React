import types from './types';

export const rockReducer = (state = [], action) => {
  switch (action.type) {
    case types.ROCK_LIST:
      return [...action.payload];
    case types.ROCK_CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
};
