import React from 'react';
require('./top.scss');
const Top = ({show}) =>{
  // console.log("Number of items:  "+show)
    return(
      <div className="manip__top">
      {show && <div className="heading"> <h1 className="mt-md heading__secondary heading__secondary--2">Files uplaoded</h1> </div>}
        <div className="manip__top-dec"></div>
      </div>
    )
};
export default Top;
