import axios from 'axios';
import * as type from '../actions/types';




const reOrganizePhotoGraphImages = (origins, results ) =>{
  let listOfImages = [];
  for(let i = 0 ; i < origins.length ; i++){
    // console.log(origins[i], results[i]);
    /*
        To run local use these changes
        listOfImages.push({'original': "./static/_png/"+origins[i], 'generated':"./static/_result/"+results[i]});
    */
    listOfImages.push({'original': "./static/png/"+origins[i], 'generated':"./static/result/"+results[i]});
  }
  return listOfImages;
}
/**
collect navigation items
*/
export function getNavigationItems( navUrl, navName){
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  const body  = { navUrl ,navName}
  return{
    type: type.CHANGE_NAV,
    payload: body
  };
}

// SENDS THE IMAGE TO THE DATABASE TO BE STORED
export const uploadFilesToDataBase =  (files)=> async dispatch => {
      let formData =new FormData();
      for(let file of files){
        formData.append("photo", file, file.name);
      }

      try{
        /*
        To run locally use these changes
        const res = await axios.post(`http://localhost:5000/api/sendFile`, formData);
        */
      const res = await axios.post(`/api/sendFile`, formData);
      console.log(res.data.success);
    }catch(err){
      console.log(err);
    }
    // MAKE THIS AN EMPTY ARRAY LIST
    // GET BACK THE SAME STATE -- SEND_IMAGE ,  STORE_FILE
      dispatch( {type: type.SEND_IMAGE, payload: [] });
}
// GET THE RESULTING IMAGES FROM THE DATABASE
export const runAlgorithmInBackEnd =  ()=> async dispatch => {
    let listOfImages = [];
    try{
      /*
      To run locally use these changes
        const res = await axios.get(`http://localhost:5000/api/algorithm`);
      */
        // RUNS THE ALGORITHM IN THE BACKEND AND SEND THE USER BACK INFOMATION
      const res = await axios.get(`/api/algorithm`);
        // STRUCTUR THE INFROMATION
      listOfImages = reOrganizePhotoGraphImages(res.data.origin,res.data.result);
      console.log(res.data.success);
    }catch(err){
      console.log(err);
      console.log("your algorithm wasnt successful");
    }
    // MAKE THIS AN EMPTY ARRAY LIST
      dispatch( {type: type.STORE_FILE, payload: listOfImages });
}

//REMOVE FILES FROM THE LOCAL STORAGE
export const removeFilesFromStorage =  ()=> async dispatch => {
    try{
      /*
      To run locally use these changes
        const res = await axios.delete(`http://localhost:5000/api/removefiles`);
      */
        // RUNS THE ALGORITHM IN THE BACKEND AND SEND THE USER BACK INFOMATION
      const res = await axios.delete(`/api/removefiles`);
      console.log(res.data.success);
    }catch(err){
      console.log(err);
    }
    // MAKE THIS AN EMPTY ARRAY LIST
      dispatch( {type: type.REMOVE_BACKEND_FILES, payload: [] });
}



export function showResultPage(show){
  return{
    type: type.SHOW_RESULT,
    payload: show
  };
}

export function storeImagesResults(files){
  return{
    type: type.STORE_FILE,
    payload: files
  };
}
export const clearFileFromBackEnd =  ()=> async dispatch => {


      try{
        /*
        To run locally use these changes
          const res = await axios.delete(`http://localhost:5000/api/clearfiles`);
        */
        const res = await axios.delete(`/api/clearfiles`);
        console.log(res.data.success);
      }catch(err){
        console.log(err);
        console.log("File has already been remove from system")
      }
      // remove the files from the state manager
      dispatch( {type: type.CLEAR_FILE, payload: [] }

   );
}


// UPDATE_NUMBER

export function changeInputField(number){
  // console.log(Number(number))
  return{
    type: type.UPDATE_NUMBER,
    payload: number
  };
}
