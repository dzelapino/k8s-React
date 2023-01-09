import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { rockGetList } from '../../ducks/rocks/operations';
import { rocksGet } from '../../ducks/rocks/selectors';

const RockList = ({ rocks, rockGetList }, props) => {
  const [menuOn, setMenu] = useState(false);

  useEffect(() => {
    rockGetList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [filter, setFilter] = useState('');
  const filterHandleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContent = rocks.filter((rock) =>
    rock.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="postContainer">
      <div className="postMenu">
        {menuOn === true ? (
          <div className="functionsMenu">
            <div className="filterContainer">
              <input
                type="text"
                value={filter}
                className="filterInput"
                onChange={filterHandleChange}
                placeholder="Filter rocks by name..."
              />
            </div>
          </div>
        ) : null}
        <button
          className="functionsMenuButton"
          onClick={() => setMenu(!menuOn)}
        >
          {menuOn === true ? <p>Hide menu</p> : <p>Show menu</p>}
        </button>
      </div>
      <div className="postList">
        {filteredContent.map((element) => {
          return (
            <div key={element.id} className="postTile">
              <div className="postTitle">
                Nickname: <Link to={`/rocks/${element.id}`}> {element.name} </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rocks: rocksGet(state),
  };
};

const mapDispatchToProps = {
  rockGetList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RockList);
