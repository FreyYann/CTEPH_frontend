import { SHOW_RESULT } from '../../actions/types';

/**
Need reducer to contain the change navigation item
*/

export default function(state = false, action){
  switch (action.type) {
    case SHOW_RESULT :
      // console.log( "show nav result : " + action.payload);
      return action.payload;
    default:
      return state;
  }

}
