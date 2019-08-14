import React, {Component} from 'react';
require('./narrator.scss');

// class Narrator extends Component{

const Narrator = () =>{
    return (
            <div className="narrator ">
            <div className="heading mt-lg mb-lg">
            <p className="heading__secondary border-bt">
              Welcome to CTEHI
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
                      <p className="narrator__text">  ipsum dolor sit amet, consectetur adipisicing elit. Quidem ea maxime inventore, saepe libero excepturi ad dolores cupiditate dicta, incidunt obcaecati asperiores voluptas quos in qui natus explicabo deleniti sunt.</p>
                    </li>
                    <li className="narrator__item">
                      <p className="narrator__text">  ipsum dolor sit amet, consectetur adipisicing elit. Autem, temporibus asperiores nulla voluptatum eius ad amet repellendus id earum labore atque similique doloremque at, delectus incidunt accusantium reprehenderit maxime aspernatur?</p>
                    </li>
                    <li className="narrator__item">
                      <p className="narrator__text">  ipsum dolor sit amet, consectetur adipisicing elit. Repellat dolores sint facilis expedita fugiat, velit animi nihil dolore nam, libero est illo rerum doloremque, sed sapiente eaque odit porro commodi!</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
    );
}

export default Narrator;
