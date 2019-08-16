import React, {Component} from 'react';
require('./narrator.scss');

// class Narrator extends Component{

const Narrator = () =>{
    return (
            <div className="narrator ">
            <div className="heading mt-lg mb-lg">
            <p className="heading__secondary border-bt">
              Welcome to CTEPH
            </p>
            </div>
            <div className="row">
              <div className="col-1-of-3">
                  <aside className="narrator__show">
                    <div className="narrator__box narrator__box--1">
                      <div className="narrator__img narrator__img--1"></div>
                    </div>
                    <div className="narrator__box narrator__box--2">
                      <div className="narrator__img narrator__img--2"></div>
                    </div>
                    <div className="narrator__box narrator__box--3">
                      <div className="narrator__img narrator__img--3"></div>
                    </div>

                  </aside>
              </div>
              <div className="col-2-of-3">
                <div className="narrator__description">
                  <div className="heading">
                    <p className="heading__tertiary mb-md">
                      legion detection
                    </p>
                  </div>
                  <ul className="narrator__list ml-lg">
                    <li className="narrator__item">
                      <p className="narrator__text">First upload all your CT Scan or CAT Scan images in dicom or any other format to able to review them.  </p>
                    </li>
                    <li className="narrator__item">
                      <p className="narrator__text">by clicking the "Algorithm!" button on top all the images will be sent to our AI algorithm to start the image detection process.</p>
                    </li>
                    <li className="narrator__item">
                      <p className="narrator__text">The algorithm result with predictions will appear next to the original images for you to review and do a faster and more accurate diagnosis.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
    );
}

export default Narrator;
