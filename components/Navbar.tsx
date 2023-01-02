import Link from "next/link";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  // @ts-ignore
  const { auth } = useContext(AuthContext);

  return (
    <>
      <nav className="border fixed split-nav"
      >
        <div className="nav-brand">
          <h3><Link href='/'>Porto Games</Link></h3>
        </div>
        <div className="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <label htmlFor="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
          <div className="collapsible-body">
            <ul className="inline">
              {auth.accessToken && <li><Link href='/hangman/leaderboard'>Leaderboard</Link></li>}
              {auth.accessToken && <li><Link href='/profile'>Profile</Link></li>}
              {!auth.accessToken && <li><Link href='/login'>Login</Link></li>}
              {!auth.accessToken && <li><Link href='/register'>Register</Link></li>}
            </ul>
          </div>
        </div>
      </nav>
      <br />
    </>
  )
}

export default Navbar;