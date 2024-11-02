import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo_movie from "../assets/logo_movie1.png";
import userIcon from "../assets/user.png";

// react icon
import { IoSearchOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { navigation } from "../constants/Navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location.search.slice(3).split("%20").join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header className="fixed top-0 z-40 h-16 w-full overflow-hidden bg-black bg-opacity-50">
      <div className="container mx-auto flex h-full items-center px-3">
        <Link to={"/"}>
          <img
            src={logo_movie}
            alt="logo"
            className="-ml-4 aspect-[3/2] w-44 object-cover lg:m-0 lg:w-48"
          />
        </Link>

        <nav className="ml-5 hidden items-center gap-1 lg:flex">
          {navigation.map((nav, i) => {
            return (
              <div key={i}>
                <NavLink
                  to={nav.href}
                  className={({ isActive }) =>
                    `${isActive && "text-neutral-100"} px-2 hover:text-neutral-100`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form
            action=""
            className="flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="hidden border-none bg-transparent px-4 py-1 text-white outline-none lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>
          <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full transition-all active:scale-50">
            <img src={userIcon} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
