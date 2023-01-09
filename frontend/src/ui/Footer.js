import Cookies from 'js-cookie';
import React, { useState } from 'react';

const Footer = () => {
  const [currentVisits, setVisits] = useState(1);

  const getCookie = () => {
    const foundCookie = Cookies.get(`visit`);
    if (foundCookie === undefined) {
      Cookies.set(`visit`, 1);
    } else {
      Cookies.set(`visit`, Number(foundCookie) + 1);
      setVisits(Number(foundCookie) + 1);
    }
  };
  window.onload = getCookie;
  return (
    <div className="footerContainer">
      <div>Here is how many times you have visited Rocksa: {currentVisits}</div>
      <div>dzelapino™</div>
    </div>
  );
};

export default Footer;
