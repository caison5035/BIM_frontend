import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./authContext";
const Layout = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav className='navbar'>
        <ul className='nav-list'>
          <li>
            {!user && <Link to='/login'>Login</Link>}
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            {user && <Link to='#'>{user?.email}</Link>}
          </li>
        </ul>
      </nav>

      <>{children}</>
    </>
  );
};
export default Layout;
