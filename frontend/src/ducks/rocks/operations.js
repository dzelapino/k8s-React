import axios from 'axios';
import * as actions from './actions';

const url = '/api/rocks';

export const rockGetList = () => async (dispatch, getState) => {
  if (getState().rocks.length) {
    console.log('Downloading from state');
    dispatch(actions.rockActionGetList(getState().rocks));
  } else {
    console.log('Downloading from API');
    const response = await axios.get(url);
    dispatch(actions.rockActionGetList(response.data));
  }
};

export const rockAdd = (rockToAdd) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(url, rockToAdd);
      if (response.status === 200)
        dispatch(actions.rockActionCreate(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
