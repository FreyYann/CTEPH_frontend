import React, {Component}from 'react';
import  { connect } from  'react-redux';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';
require('./update.scss');

class Update extends Component{
// function Update(props) {
  constructor(props){
    super(props);
    props.getPath(props.location.pathname);
    // console.log(this.props);
  }

  render(){
    return (  <section className="manip">
                <Top show={this.props.showresult}/>
                <Middle/>
                <Bottom/>
              </section>
    );
  }
}
//
// export default Update;
// export default Result;
const mapStateToProps = (state) => {
  return {
    showresult: state.showresult
  };
}

export default connect(mapStateToProps)(Update);
