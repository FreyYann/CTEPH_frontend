import React, {Component} from 'react';
import SliderItem from './SliderItem';
import  { connect } from  'react-redux';
import {   changeInputField } from  '../../../../actions';
// require('./middle.scss');

require('./slider.scss');

// Array.from(new  Array(10)).





class Slider extends Component{
  state={scrollIndex: 0, index: 0 };
    constructor(props){
      super(props);
      this.sliderList= React.createRef();
    }
    componentDidMount(){
      // console.log(this.props.filestorage.length);
        this.props.changeInputField(this.props.filestorage.length);
    }

    // static getDerivedStateFromProps(props, state){
    //   console.log("index " + state.index);
    //   if(state.index === 1)
    //     props.onUploadImages( props.filestorage[0]);
    //     // console.log( props.filestorage[0] );
    //   return {index: state.index+1};
    // }
    render(){
      // console.log(this.list)
      // this.list.map(image => console.log(image));
      let files= [] ;
      if(this.props.filestorage.length > 0)
        files = this.props.filestorage;
        // console.log(files);

      return(
        <div className="slider">
          <ul ref={this.sliderList} className="slider__list" onWheel={this.onWheel}>
            {
             files.map((image , idx)=><SliderItem key={idx} id={idx}
              images={image} onSelect={this.onSelect} onChangeIcon={this.props.onChangeIcon}/>)
            }
          </ul>
        </div>
      );
    }
    componentDidUpdate(){
      // console.log(this.props);
      // console.log(this.props.filestorage[0]);
      if(this.state.index <=0 && this.props.filestorage.length > 0){
        // console.log(this.props.filestorage[0])
        this.props.onUploadImages( this.props.filestorage[0]);
        this.setState({index: this.state.index+1});
      }
    }

    onSelect = (id) =>{
      // console.log(id);
      let lists = this.sliderList.current.childNodes;
      let scrollIndex = 0;
      lists.forEach((item, idx)=>{
        // console.log(Number(item.id) === idx)
        if(Number(item.id) === id)scrollIndex =idx;
      });
      this.setState({scrollIndex});
      for(let item of lists){
        item.style= 'border: 2px solid transparent';
      }
      lists[scrollIndex].style= 'border : 2px solid green';

    }

    onWheel = (event) =>{
      let scrollIndex = this.state.scrollIndex;
      let lists = this.sliderList.current.childNodes;
    if(event.deltaY < 0 && scrollIndex > 0){
        scrollIndex--;
    }else if( event.deltaY > 0 && scrollIndex < lists.length-1){
        scrollIndex++;

    }
    this.sliderList.current.scrollLeft += event.deltaY;
    let image = {original: lists[scrollIndex].childNodes[0].src,
                 generated: lists[scrollIndex].childNodes[1].childNodes[0].src }
    this.props.onChangeIcon(image);

    for(let item of lists){
      item.style= 'border: 2px solid transparent';
    }
    lists[scrollIndex].style= 'border : 2px solid green';

    this.setState({scrollIndex});
    }
}
// this.props.uploadFilesToDataBase(list.length);

const mapStateToProps = (state) => {
  return {
    filestorage: state.filestorage
  };
}


export default connect(mapStateToProps, {changeInputField})(Slider);
