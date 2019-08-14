import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { connect } from  'react-redux';
import BigIcon from './BigIcon';
import SmallIcon from './SmallIcon';
import Slider from './Slider';
require('./result.scss');

class Result extends Component{
  state = { smallicon: '', bigicon: '', checkbox: true};
  constructor(props){
    super(props);
    props.getPath(props.location.pathname);
  }
  componentDidMount(){
    // console.log(this.props.filestorage[0]);
    // console.log(this.props.filestorage);
    if(this.props.filestorage.length){
      let bigicon =this.props.filestorage[0].generated;
      let smallicon =this.props.filestorage[0].original;
      this.setState({smallicon, bigicon });
    }
  }
  onChangeIcon = (image) =>{
    this.setState({smallicon:image.original, bigicon:image.generated });
  }
  onSwitchIcon= ()=>{
    this.setState({smallicon:this.state.bigicon, bigicon:this.state.smallicon });
  }

  checkBoxCheck= ()=>{
    // console.log(this.state.checkbox);
    this.setState( {checkbox: !this.state.checkbox });
  }
  render(){
    // console.log(this.state)
    return (
      <section className="result">
      <SmallIcon
      activateCheckBox={this.checkBoxCheck}
      checkbox={this.state.checkbox}
      icon={this.state.smallicon}
      onSwitchIcon={this.onSwitchIcon}/>

      <BigIcon iconbg={this.state.bigicon}
      iconsm={this.state.smallicon}
       checkbox={this.state.checkbox}/>

      <Slider onChangeIcon={this.onChangeIcon}/>
      </section>
    );
  }
}

// export default Result;
const mapStateToProps = (state) => {
  return {
    filestorage: state.filestorage
  };
}

export default connect(mapStateToProps)(Result);
