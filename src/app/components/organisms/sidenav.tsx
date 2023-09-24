import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/app/context";
import React from "react";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const currentUrl = window.location.href;

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`block border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <img src={"/img/logos/logo-ico.png"} className="h-11" />
          <div>
            <Typography
              variant="h4"
              color="white"
              className="uppercase"
            >
              MyKaryawan
            </Typography>
          </div>
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 h-[calc(100vh-180px)] overflow-scroll scrollbar-hide">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, showSidebar }) => (
              <React.Fragment key={name}>
                {showSidebar && (
                  <li>
                    <NavLink to={`/${layout}${path}`}>
                      <Button
                        variant={
                          currentUrl.includes(layout) ? "gradient" : "text"
                        }
                        color={
                          currentUrl.includes(layout)
                            // ? "yellow"
                            ? "blue"
                            : sidenavType === "dark"
                            ? "white"
                            : "green"
                        }
                        // className={`flex items-center gap-4 px-4 capitalize ${currentUrl.includes(layout) ? "bg-blue-300" : sidenavType === "dark" ? "" : "bg-green-500"} `}
                        className={`flex items-center gap-4 px-4 capitalize`}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    </NavLink>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logos/icon_logo.png",
  brandName: "",
  // brandName: "absendulu",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/components/organisms/sidenav.tsx";

export default Sidenav;
