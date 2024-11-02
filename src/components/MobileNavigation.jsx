import { NavLink } from "react-router-dom";
import { mobileNavigation } from "../constants/Navigation";

const MobileNavigation = () => {
  return (
    <section className="fixed bottom-0 z-40 h-14 w-full bg-black bg-opacity-70 backdrop-blur-2xl lg:hidden">
      <div className="flex h-full items-center justify-between text-neutral-400">
        {mobileNavigation.map((nav) => {
          return (
            <NavLink
              key={nav.label + "mobilenavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `${isActive && "text-white"} flex h-full flex-col items-center justify-center px-3`
              }
            >
              <div className="text-2xl">{nav.icon}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
