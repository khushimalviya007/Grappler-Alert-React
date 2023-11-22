import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav className='navbar-container'>
      <ul style={{color:"black"}}>
      <Link to="/users/rules" className="btn bd-primary">Create Rule</Link>
      <Link to="/users/showrules" className="btn bd-primary">Show Rule</Link>
      </ul>
    </nav>
    </>
  );
};
export default Navbar;