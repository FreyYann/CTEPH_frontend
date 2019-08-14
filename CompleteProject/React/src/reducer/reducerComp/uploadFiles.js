import { UPLOAD_FILE } from '../../actions/types';

/**
Need reducer to contain the change navigation item
*/

export default function(state = null, action){
  switch (action.type) {
    case UPLOAD_FILE :
      // console.log(action.payload)
      return action.payload;
    default:
      return state;
  }

}
