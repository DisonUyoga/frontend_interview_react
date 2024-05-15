import { link } from "fs";
import Link from "next/link";

const nav_links = [
  {
    display: "",
    url: ".",
  },
  {
    display: "",
    url: "",
  },
];

function NavBar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link className="btn btn-ghost text-xl" href=".">
            Near Earth Objects
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {nav_links.map((link) => (
              <Link className="ml-5" href={link.url}>
                {link.display}
              </Link>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            href={"https://api.nasa.gov/#asteroids-neows"}
            className="btn btn-primary btn-sm"
          >
            more info...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
