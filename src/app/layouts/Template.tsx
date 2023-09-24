import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/app/components";
import Sidenav from "../components/organisms/sidenav";
import {routes} from "@/app/routes";
import {
  setOpenConfigurator,
} from "@/app/context";

export function Template() {
  const { layout } = useParams();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-gray-50/50">
    <Sidenav
        routes={routes}
    />
        <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

        {/* Activate line below f want to enable icon of configurator */}
        {/* <IconButton
            size="lg"
            color="white"
            className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
            ripple={false}
            onClick={() => setOpenConfigurator(true)}
        >
            <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {routes.map(
            ({ layout: routeLayout , pages }) =>
              layout === routeLayout &&
              pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
        <div className="text-blue-gray-600 mb-2 xl:ml-80">
          <Footer />
        </div>
    </div>
  );
}

export default Template;
