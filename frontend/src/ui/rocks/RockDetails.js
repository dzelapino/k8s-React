import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { rockGetList } from '../../ducks/rocks/operations';
import { rocksGet } from '../../ducks/rocks/selectors';

const RockDetails = ({ idLink, rockGetList }, props) => {
  const history = useHistory();


  useEffect(() => {
    rockGetList();
    console.log(idLink);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rockDetails">
      {idLink.map((rock) => (
        <div key={rock.id} className="rockDataColumn">
          <div className="rockData">
            <div className="rockImageAndName">
              <p>{rock.name}</p>
              <div className="rockButtonsAndText">
                <div className="rockText">
                  <p>
                    {'Favourite color: '} {rock.color}
                  </p>
                </div>
                <div className="rockButtons">
                  <button className="button" onClick={() => history.goBack()}>
                    {'Go back'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  const idLink = state.rocks.filter((x) => x.id.toString() === id);
  return {
    idLink: idLink,
    rocks: rocksGet(state),
  };
};

const mapDispatchToProps = {
  rockGetList,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RockDetails)
);
