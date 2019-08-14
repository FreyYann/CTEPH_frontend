import { UPDATE_NUMBER } from '../../actions/types';

/**
Need reducer to contain the change navigation item
*/

export default function(state = 0, action){
  switch (action.type) {
    case UPDATE_NUMBER :
      // console.log(action.payload)
      return action.payload;
    default:
      return state;
  }

}
