import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbarContent">
        <Link to={`/`}> Start </Link>
        <Link to={`/rocks`}> Rocks </Link>
      </div>
    </div>
  );
};
export default Navbar;
