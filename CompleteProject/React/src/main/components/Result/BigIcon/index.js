import React from 'react';
require('./bigicon.scss');

const BigIcon = (props) =>{
  let {iconbg, iconsm, checkbox} = props;
  // console.log(checkbox);
  // checkbox
  if(iconbg === "") iconbg = './static/assets/img/machine-lg.jpg';
  if(iconsm === "") iconsm = './static/assets/img/machine-lg.jpg';
  return (
    <div className="bigicon" style={checkbox? {justifyContent:"space-around"}: {}}>
        {checkbox &&
          <div className="bigicon__container-switch" >
              <img className="bigicon__img"
              src={iconsm}
              alt="Medical" />
          </div>
        }
      <div className= {`  ${checkbox? "bigicon__container-switch": "bigicon__container"}`} >
          <img className="bigicon__img"
          src={iconbg}
          alt="Medical" />
      </div>
    </div>
  );
}
// <div className= `bigicon__container ${}`
// style={checkbox? {display:'block'}:{display:'none'}}>
//     <img className="bigicon__img"
//     src={icon}
//     alt="Medical" />
// </div>

export default BigIcon;
