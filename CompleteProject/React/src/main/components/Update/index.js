import React from 'react';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';
require('./update.scss');
function Update(props) {
    props.getPath(props.location.pathname);
  return (  <section className="manip">
              <Top/>
              <Middle/>
              <Bottom/>
            </section>
  );
}

export default Update;
