import { STORE_FILE, CLEAR_FILE,REMOVE_BACKEND_FILES } from '../../actions/types';

/**
Need reducer to contain the change navigation item
*/

export default function(state = [], action){
  switch (action.type) {
      case REMOVE_BACKEND_FILES:
        return state;
      case STORE_FILE :
      case CLEAR_FILE :
        return action.payload;
    default:
      return state;
  }

}
