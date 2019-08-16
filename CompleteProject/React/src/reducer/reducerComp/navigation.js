import { CHANGE_NAV } from '../../actions/types';

/**
Need reducer to contain the change navigation item
*/

export default function(state = false, action){
  switch (action.type) {
    case CHANGE_NAV :
      // console.log(action.payload)
      return action.payload;
    default:
      return state;
  }

}
