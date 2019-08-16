import React, {PureComponent} from  'react';
import {  Link } from 'react-router-dom';
import  { connect } from  'react-redux';

class Navigation extends PureComponent{
  state = { pageNumber: 200};


  constructor(props) {
    super(props);
    this.page = React.createRef();
    // console.log(props);
  }
  focusInputField = ()=>{this.page.current.focus();}
  changePageNumber = (event)=>{this.setState({pageNumber:event.target.value})}


  static getDerivedStateFromProps(props, state){
    return{pageNumber: props.updateinputtext};
  }


  render(){

    let { navUrl, navName } =
     !!this.props.navigation?
     this.props.navigation: {};
     let onResultPage = (window.location.pathname === '/result');

     if(window.location.pathname !== '/result' && !this.props.showresult){
       if(!!navUrl) navUrl = navUrl.filter(url => url !=='/result');
       if(!!navName) navName = navName.filter(name => name !=='result');
     }

        // console.log("In Navigation  : "+this.props.showresult);
    return (
      <nav className="nav">
          <ul className="nav__list">

            {
              onResultPage && <li onClick={this.focusInputField} className="nav__item-sm"><span>#
                <input
                ref={this.page}
                onChange={this.changePageNumber}
                value={this.state.pageNumber}
                className="nav__input"
                type="text"
                 maxLength="3"/>
                </span></li>
            }
            {

            !!navUrl &&  navUrl.map( (url, idx)=>
                <li key={navName[idx]} className="nav__item"><Link className="nav__link" to={url}>{navName[idx]}</Link></li>
              )
            }


          </ul>
      </nav>
    );
  }


}


const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
    showresult: state.showresult,
    updateinputtext: state.updateinputtext
  };
}

// export default Navigation;
export default connect(mapStateToProps )(Navigation);



// import { runAlgorithmInBackEnd, showResultPage } from  '../actions';
  // runAlgorithmInBackEnd = async ()=>{
  //   await this.props.runAlgorithmInBackEnd();
  //   await this.props.showResultPage(true);
  // }
  // {
  //   onResultPage && <li onClick={this.runAlgorithmInBackEnd} className="nav__item">
  //     <div className="nav__link" >algorithm</div>
  //   </li>
  // }

  // export default connect(mapStateToProps,
  //   {runAlgorithmInBackEnd, showResultPage} )(Navigation);
