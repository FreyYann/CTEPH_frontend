import React from 'react';
import { Link } from 'react-router-dom';
require('./footer.scss');


function Footer(props) {
  return (
    <footer className="footer" >
      <ul className="footer__list">
        <li className="footer__item"><Link to="/upload" className="footer__link">Update</Link></li>
        <li className="footer__item"><Link to="/result" className="footer__link">Result</Link></li>
        <li className="footer__item"><Link to="/about" className="footer__link">About</Link></li>
      </ul>
      <div className="footer__desc"><p className="footer__text">Thank you for using our application</p></div>
    </footer>

  );
}


export default Footer;
