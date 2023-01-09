import types from './types';

export const rockActionGetList = (rocks) => ({
  type: types.ROCK_LIST,
  payload: rocks,
});

export const rockActionCreate = (rockCreated) => ({
  type: types.ROCK_CREATE,
  payload: rockCreated,
});
