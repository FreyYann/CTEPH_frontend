import React from 'react';
require('./smallicon.scss');

const SmallIcon = (props) =>{
  let {icon, activateCheckBox, checkbox, runAlgorithmInBackEnd, generate} = props;
  if(icon === "") icon = '';
  return (
    <div className="smallicon">

      {  <div className="smallicon__container" style={(checkbox || !icon) ? { visibility: 'hidden'}:{visibility: 'visible'} }>
            <img onClick={props.onSwitchIcon} className="smallicon__img"
             src={icon}
             alt="Medical"/>
        </div>
      }
      <div className="smallicon__switch">
          <button onClick={activateCheckBox}  className="smallicon__btn">
          {/*Generated by IcoMoon.io */}
            <svg  className="smallicon__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>switch</title>
            <path d="M5.485 11.285c0.447-2.673 3.21-5.588 6.479-5.588 1.891 0 3.58 0.868 4.762 2.206l1.59-1.060c-1.553-1.845-3.857-3.041-6.422-3.041-4.25 0-7.764 2.953-8.297 7.117l-3.597-0.695 3.541 5.237 5.238-3.539-3.294-0.637zM20.459 8.539l-5.238 3.539 3.293 0.637c-0.446 2.673-3.21 5.589-6.479 5.588-1.892 0-3.58-0.868-4.763-2.206l-1.589 1.060c1.553 1.845 3.857 3.041 6.422 3.041 4.249 0 7.764-2.953 8.296-7.117l3.599 0.695-3.541-5.237z"></path>
            </svg>
          </button>
          <button onClick={runAlgorithmInBackEnd} className="smallicon__algo">
            <svg className= { generate?"smallicon__animation smallicon__svg ":"smallicon__svg " } version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32">
              <title>generate</title>
              <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
            </svg>
          </button>
      </div>
    </div>
  );
}

export default SmallIcon;