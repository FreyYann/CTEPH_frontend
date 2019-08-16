import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { connect } from  'react-redux';
import {runAlgorithmInBackEnd, changeInputField} from  '../../../actions';
import BigIcon from './BigIcon';
import SmallIcon from './SmallIcon';
import Slider from './Slider';
require('./result.scss');

class Result extends Component{
  state = { smallicon: '', bigicon: '', checkbox: true, generate: false};
  constructor(props){
    super(props);
    props.getPath(props.location.pathname);
  }
  componentDidMount(){
    // console.log(this.props.filestorage);
    if(this.props.filestorage.length){
      let bigicon =this.props.filestorage[0].generated;
      let smallicon =this.props.filestorage[0].original;
      this.setState({bigicon, smallicon });
      this.props.changeInputField(this.props.filestorage.length);
    }

    // console.log("update "+this.state.index);
    // this.setState({index: this.state.index+1});
  }
  onUploadImages = ({generated, original}) => {
    // console.log("upload images ");
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
    // console.log(this.state.checkbox);
    this.setState( {checkbox: !this.state.checkbox });
  }
  runAlgorithmInBackEnd = async () =>{
    // console.log("runAlgorithmInBackEnd");
    this.setState({generate:!this.state.generate});
    await this.props.runAlgorithmInBackEnd();
    // console.log(this.props.filestorage.length);
    await this.props.changeInputField(this.props.filestorage.length);
    this.setState({generate:!this.state.generate});
  }

  render(){
    // console.log(this.state)
    return (
      <section className="result">
      <SmallIcon
      generate={this.state.generate}
      runAlgorithmInBackEnd={this.runAlgorithmInBackEnd}
      activateCheckBox={this.checkBoxCheck}
      checkbox={this.state.checkbox}
      icon={this.state.smallicon}
      onSwitchIcon={this.onSwitchIcon}/>

      <BigIcon iconbg={this.state.bigicon}
      iconsm={this.state.smallicon}
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
