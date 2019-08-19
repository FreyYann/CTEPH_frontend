import React from 'react';
require('./slideritem.scss');

const SliderItem = (props) =>{
  const {images } = props;
  // console.log();
  // props.onSelect(props.id);


  return (
    <li id={props.id} className="slider__item">
          <img onClick={()=>{props.onSelect(props.id); props.onChangeIcon(images)}} className="slider__img"
           src={images.original}
            alt="generated"/>
          <div style={{display:'none'}}>
            {images.generated}
          </div>
    </li>
  );
}

export default SliderItem;

// <img className="slider__img"
//  src={images.generated}
//   alt="original"/>
