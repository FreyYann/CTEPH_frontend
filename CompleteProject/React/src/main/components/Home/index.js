import React from 'react';
import Slide from './Slide';
import Narrator from './Narrator';
import Video from './Video';
import Footer from './Footer';
require('./home.scss');
function Home(props) {
  props.getPath(props.location.pathname);
  return (
    <section className="home">
    <Slide />
    <Narrator />
    <Video />
    <Footer/>
    </section>
  );
}

export default Home;
    // <h1>Home Page</h1>
