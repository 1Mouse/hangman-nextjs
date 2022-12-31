import Link from "next/link";

const Navbar = () => {
  return (
    <>
    <nav className="border fixed split-nav" 
    >
      <div className="nav-brand">
        <h3><Link href='./'>Porto Games</Link></h3>
      </div>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1"/>
          <label htmlFor="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
          <div className="collapsible-body">
            <ul className="inline">
              <li><a href="#">Leaderboard</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
      </div>
    </nav>
    <br/>
    </>
  )
}

export default Navbar;