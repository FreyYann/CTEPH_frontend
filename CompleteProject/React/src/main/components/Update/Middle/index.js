import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import  { connect } from  'react-redux';
import {   uploadFilesToDataBase,
           showResultPage,
           storeImagesResults,
           clearFileFromBackEnd,
           removeFilesFromStorage
} from  '../../../../actions';
require('./middle.scss');

class Middle extends Component{
  state = {
    loader: false,
    // algorithm: false,
    redirect: false
  };
  constructor(props){
    super(props);
    this.formInfo = React.createRef();
  }

  componentDidMount(){
    this.setState({redirect: false});
    // console.log("component DidMount")
  }
    updateOnClick = async (event)=>{
        const files = event.target.files;

        this.setState({loader: !this.state.loader});
        // get images
        await this.props.uploadFilesToDataBase(files);

        //REMOVE LOADER FROM THE
        this.setState({loader: !this.state.loader});
        //SHOW RESULT PAGE
        await this.props.showResultPage(true);
        //REDIRECT FROM UPLOAD TO RESULT
        this.setState({redirect: true});

    }
    removeAllOnClick = (event)=>{
      // console.log(this.props.history);
        //Remove items from file
        this.props.showResultPage(false);
        // Remove from the file and the backend
        this.props.clearFileFromBackEnd();
    }




    // runAlgorithmInBackEnd = async ()=>{
    //   //REMOVE BUTTONS AND activate loader
    //   this.setState({algorithm: !this.state.algorithm, loader: !this.state.loader});
    //
    //   await this.props.runAlgorithmInBackEnd();
    //   // deactivate loader
    //   this.setState({loader: !this.state.loader});
    //   await this.props.showResultPage(true);
    //   // console.log(this.state.redirect);
    //   // this.setState({loader: !this.state.loader});
    //   this.setState({redirect: true});
    // }
    // // DONT NEED A LOADER FOR THIS
    // removeFilesFromStorage= async()=>{
    //   //REMOVE BUTTONS
    //   // this.setState({algorithm: !this.state.algorithm});
    //   this.setState({loader: !this.state.loader, algorithm: !this.state.algorithm});
    //   await this.props.removeFilesFromStorage();
    //   this.setState({loader: !this.state.loader});
    // }

    renderRedirect = () => {

      if (this.state.redirect) {
        return <Redirect to='/result' />
      }
    }
  render(){
    return (
      <div className="manip__container">
        {this.renderRedirect()}
        {/*UPLOAD BUTTON*/}
        <form className="loader" ref={this.formInfo}>
          <label htmlFor="file" className="btn__update">
            <svg className="btn__update-img btn__update-img--1 "   version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>upload</title>
              <path d="M14 18h4v-8h6l-8-8-8 8h6zM20 13.5v3.085l9.158 3.415-13.158 4.907-13.158-4.907 9.158-3.415v-3.085l-12 4.5v8l16 6 16-6v-8z"></path>
            </svg>
          </label>
          {/*LOADER*/}
          <div className="loader__screen" style={this.state.loader  ? {display:"flex"} : {display:"none"} }>
            <svg  className="loader__img" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>spinner2</title>
            <path d="M32 16c-0.040-2.089-0.493-4.172-1.331-6.077-0.834-1.906-2.046-3.633-3.533-5.060-1.486-1.428-3.248-2.557-5.156-3.302-1.906-0.748-3.956-1.105-5.981-1.061-2.025 0.040-4.042 0.48-5.885 1.292-1.845 0.809-3.517 1.983-4.898 3.424s-2.474 3.147-3.193 4.994c-0.722 1.846-1.067 3.829-1.023 5.79 0.040 1.961 0.468 3.911 1.254 5.694 0.784 1.784 1.921 3.401 3.316 4.736 1.394 1.336 3.046 2.391 4.832 3.085 1.785 0.697 3.701 1.028 5.598 0.985 1.897-0.040 3.78-0.455 5.502-1.216 1.723-0.759 3.285-1.859 4.574-3.208 1.29-1.348 2.308-2.945 2.977-4.67 0.407-1.046 0.684-2.137 0.829-3.244 0.039 0.002 0.078 0.004 0.118 0.004 1.105 0 2-0.895 2-2 0-0.056-0.003-0.112-0.007-0.167h0.007zM28.822 21.311c-0.733 1.663-1.796 3.169-3.099 4.412s-2.844 2.225-4.508 2.868c-1.663 0.646-3.447 0.952-5.215 0.909-1.769-0.041-3.519-0.429-5.119-1.14-1.602-0.708-3.053-1.734-4.25-2.991s-2.141-2.743-2.76-4.346c-0.621-1.603-0.913-3.319-0.871-5.024 0.041-1.705 0.417-3.388 1.102-4.928 0.683-1.541 1.672-2.937 2.883-4.088s2.642-2.058 4.184-2.652c1.542-0.596 3.192-0.875 4.832-0.833 1.641 0.041 3.257 0.404 4.736 1.064 1.48 0.658 2.82 1.609 3.926 2.774s1.975 2.54 2.543 4.021c0.57 1.481 0.837 3.064 0.794 4.641h0.007c-0.005 0.055-0.007 0.11-0.007 0.167 0 1.032 0.781 1.88 1.784 1.988-0.195 1.088-0.517 2.151-0.962 3.156z"></path>
            </svg>
          </div>
          {/*BIN BUTTON*/}
        </form>
        <input  onChange={this.updateOnClick}
         id="file" type="file"
          style={{display:'none'}} multiple/>
        <button className="btn__clear" onClick={this.removeAllOnClick}>
        <svg className="btn__clear-img btn__clear-img--1" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>bin</title>
          <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
          <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
        </svg>
        </button>
      </div>
    );
  };
}
const mapStateToProps = (state) => {
  return {
    uploadFiles: state.uploadFiles,
  };
}
export default connect(mapStateToProps,
  {uploadFilesToDataBase,
   showResultPage,
   storeImagesResults,
   clearFileFromBackEnd,
   // runAlgorithmInBackEnd,
   removeFilesFromStorage })(Middle);

/*
   <div onClick={this.runAlgorithmInBackEnd} style={this.state.algorithm ? {display:"flex"} : {display:"none"} } className="update__top">
     <svg className ="update__top-svg" version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32">
       <title>cog</title>
       <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
     </svg>
   </div>
   <div onClick={this.removeFilesFromStorage} style={this.state.algorithm ? {display:"flex"} : {display:"none"} }className="update__bottom">
     <svg className="update__bottom-svg" version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32">
       <title>cross</title>
       <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
     </svg>
   </div>
   */

         // <img src={update} alt="update" className="update__img"/>
                  // <img src={binsvg} alt="clear" className="btn__clear-img btn__clear-img--1"/>
