import React, {Component} from 'react';
import machine from '../../../../../dist/static/assets/img/machine-lg.jpg';
import backbone from '../../../../../dist/static/assets/img/backbone-lg.jpg';
import doctor from  '../../../../../dist/static/assets/img/doctor-lg.jpg';
require('./slide.scss');

class Slide extends Component{
  // state={
  //   currentSlide: 0
  // }
  constructor(props){
    super(props);
    this.state={
        currentSlide: -1,
        words:[ "First scan the body for images of the organ",
                "Then collect the x-ray of the pacient from machine",
                "Examine issue with the pacients x-ray"
              ],
        type:'First scan the body for images of the organ',
        index:0
      };
    this.sliders = React.createRef();
    this.navSliders = React.createRef();
  }
  componentDidMount(){
    this.slide = setInterval(this.switchSlides.bind(this), 10000);
  }

  switchSlides(){
    if(this.type)
      clearInterval(this.type);
    this.setState({ currentSlide:  (this.state.currentSlide+1) % 3, type: '', index: 0 });
    // console.log("clear")
    this.type = setInterval(this.typeWords, 150);
  }
  typeWords = ()=>{
    let { currentSlide, type, words, index } = this.state;
    if(!!words[(currentSlide+1)%3][index] || words[(currentSlide+1)%3][index] === '' )
      this.setState({ type:type+ words[(currentSlide+1)%3][index], index: index+1 });
  }


  render(){
    return (
      <div className="slide__container ">
        <div className="slide__overlay"
         onMouseOver={this.onMouseOverOverlay}
         onMouseLeave={this.onMouseLeaveOverlay}></div>
        <ul id="slides" className="slide__list" ref={this.sliders}>
          <li className="slide showing">
              <img className="slide-img" src={machine} alt="Machine" />
              <div className="slide__decrip">
                <p className="slide__text"> {this.state.type}
                   </p>
              </div>

          </li>
          <li className="slide">
            <img className="slide-img" src={backbone} alt="Xray" />
            <div className="slide__decrip">
              <p className="slide__text">{this.state.type}
                 </p>
            </div>
          </li>
          <li className="slide">
            <img className="slide-img" src={doctor} alt="Doctor" />
            <div className="slide__decrip">
              <p className="slide__text"> {this.state.type}
                 </p>
            </div>
          </li>
        </ul>
        <nav className="sliderNav">
          <ul ref={this.navSliders} className="sliderNav-list">
            <li id="0" onClick={this.onClickSliderNav} className="sliderNav-items" style={{backgroundColor:'#777'}}>&nbsp;</li>
            <li id="1"  onClick={this.onClickSliderNav} className="sliderNav-items">&nbsp;</li>
            <li id="2"  onClick={this.onClickSliderNav} className="sliderNav-items">&nbsp;</li>
          </ul>
        </nav>
      </div>

    );
  }
  onMouseOverOverlay = (event) =>{
    let {words , currentSlide} = this.state;
    if(this.type)
      clearInterval(this.type);
    clearInterval(this.slide);
    this.setState({ type: words[(currentSlide+1)%3] });
  }
  onMouseLeaveOverlay = () => {
    this.slide = setInterval(this.switchSlides.bind(this), 10000);
  }


  onClickSliderNav = (event) =>{
    // console.log(event.target);
    let element =  event.target;
    // console.log(this.navSliders);
    // console.log(this.sliders);
    let listNavSlider = this.navSliders.current.childNodes;
    let slides = this.sliders.current.childNodes;

    for(let node of listNavSlider){
      if(node.id !== element.id)
        node.style.backgroundColor = "#ccc";
      else{
        node.style.backgroundColor = "#777";
        let prev  = Number(element.id);
        if(prev === 0){prev =3;}
        prev -=1;
        //Remove previous slide
        for(let slide of slides){
          if(slide.className.indexOf("showing") !== -1)
            slide.className = 'slide';
        }

        let currentSlide = (prev)%slides.length;
        slides[currentSlide].className = 'slide showing';
        if(this.type)
          clearInterval(this.type);
        clearInterval(this.slide);
        this.slide = setInterval(this.switchSlides.bind(this), 10000);
        // update currentSlider number
        this.setState({ currentSlide : currentSlide, type: this.state.words[(currentSlide+1)%3] });
        // clearInterval(slideInterval);
      }
    }


        //------------------
  }

  componentDidUpdate(prevProps){
    // console.log("components Did update");
    let {currentSlide}  = this.state;
    // console.log(this.sliders.current.childNodes[currentSlide]);
    if(currentSlide >= 0){
      this.sliders.current.childNodes[currentSlide].className = 'slide';//  'slide showing';
      this.navSliders.current.childNodes[currentSlide].style.backgroundColor = "#ccc";
      this.sliders.current.childNodes[((currentSlide +1 ) % 3)].className =  'slide showing';
      this.navSliders.current.childNodes[((currentSlide +1 ) % 3)].style.backgroundColor = "#777";

    }
  }

  componentWillUnmount(){
    clearInterval(this.slide);
    clearInterval(this.type);
  }

}
export default Slide;
