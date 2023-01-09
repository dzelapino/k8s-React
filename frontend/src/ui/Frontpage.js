import React from 'react';
import { connect } from 'react-redux';
import foreground from '../images/foregroundBlack.png';
import background from '../images/backgroundMagenta.png';
import { Link } from 'react-router-dom';

const Frontpage = () => {
  return (
    <div className="frontpageContainer">
      <div className="frontpageHeader">
        <img className="frontpageBackground" src={background} alt={''} />
        <img className="frontpageForeground" src={foreground} alt={''} />
        <div className="frontpageTitleAndMOTDWrapper">
          <div className="frontpageTitle">ROCKSA</div>
        </div>
      </div>
      <div className="formHolder">
        <div className="login">
          <div className="registerLink">
            <Link to={`/rocks/form/add`}> {'Add Rock!'} </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(Frontpage);
