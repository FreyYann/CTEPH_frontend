import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { connect } from  'react-redux';
import {runAlgorithmInBackEnd, changeInputField} from  '../../../actions';
import BigIcon from './BigIcon';
import SmallIcon from './SmallIcon';
import Slider from './Slider';
require('./result.scss');

class Result extends Component{
  state = { smallicon: '', bigicon: '', checkbox: true, generate: false, modify: false};
  constructor(props){
    super(props);
    props.getPath(props.location.pathname);
  }
  componentDidMount(){
    if(this.props.filestorage.length){
      let modify = false;
      let bigicon =this.props.filestorage[0].generated;
      let smallicon =this.props.filestorage[0].original;
      this.props.changeInputField(this.props.filestorage.length);
      if(this.props.filestorage.length > 0){
        modify = true;
      }
      this.setState({bigicon, smallicon, modify });
    }
  }
  onUploadImages = ({generated, original}) => {
    // CHANGES BIG IMAGES TO THE ACTUAL  IMAGES
    if(!generated)  generated = '';
    if(!original) original ='';
    this.setState({ bigicon: generated, smallicon: original });
  }

  onChangeIcon = (image) =>{
    this.setState({smallicon:image.original, bigicon:image.generated });
  }
  onSwitchIcon= ()=>{
    this.setState({smallicon:this.state.bigicon, bigicon:this.state.smallicon });
  }

  checkBoxCheck= ()=>{
    this.setState( {checkbox: !this.state.checkbox });
  }
  runAlgorithmInBackEnd = async () =>{
      this.setState({generate:!this.state.generate});
      await this.props.runAlgorithmInBackEnd();
      await this.props.changeInputField(this.props.filestorage.length);
      this.setState({generate:!this.state.generate, modify:!this.state.modify});
  }

  render(){
    // console.log(this.state)
    return (
      <section className="result">
      <SmallIcon
      modify={this.state.modify}
      generate={this.state.generate}
      runAlgorithmInBackEnd={this.runAlgorithmInBackEnd}
      activateCheckBox={this.checkBoxCheck}
      checkbox={this.state.checkbox}
      icon={this.state.smallicon}
      onSwitchIcon={this.onSwitchIcon}/>

      <BigIcon iconbg={this.state.smallicon}
      iconsm={this.state.bigicon }
       checkbox={this.state.checkbox}/>

      <Slider
      onUploadImages={this.onUploadImages}
      onChangeIcon={this.onChangeIcon}
      />
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

export default connect(mapStateToProps, {runAlgorithmInBackEnd, changeInputField})(Result);
