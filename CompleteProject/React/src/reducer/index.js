import { combineReducers } from 'redux';
import navigation from './reducerComp/navigation';
import uploadFiles from './reducerComp/uploadFiles';
import showresult from './reducerComp/showresult';
import filestorage from './reducerComp/filestorage';
import updateinputtext from './reducerComp/updateinputtext'

const rootReducer = combineReducers({
  navigation,
  uploadFiles,
  showresult,
  filestorage,
  updateinputtext
});

export default rootReducer;
