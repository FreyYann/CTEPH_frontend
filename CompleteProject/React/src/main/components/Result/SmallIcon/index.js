import React from 'react';
require('./smallicon.scss');

const SmallIcon = (props) =>{
  let {icon, activateCheckBox, checkbox} = props;
  if(icon === "") icon = './static/assets/img/machine-lg.jpg';
  return (
    <div className="smallicon">

        <div className="smallicon__container" style={checkbox ? { visibility: 'hidden'}:{visibility: 'visible'} }>
            <img onClick={props.onSwitchIcon} className="smallicon__img"
             src={icon}
             alt="Medical"/>
        </div>
      <div className="smallicon__switch">
          <label onClick={activateCheckBox}  className="smallicon__btn"><span></span></label>
      </div>
    </div>
  );
}

export default SmallIcon;
