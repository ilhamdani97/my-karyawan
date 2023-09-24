import * as React from "react";
import { Cookies } from "react-cookie";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
} from "@material-tailwind/react";
import {
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/app/context";
import { useRecoilState } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { routes } from "@/app/routes";
import { getBackgroundColor, getInitialLetter } from "@/utils/general";
import { Modal } from "@/app/components/molecules";

export interface IDashboardNavbarProps {}

export default function DashboardNavbar(props: IDashboardNavbarProps) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [searchAll, setSearchAll] = useRecoilState(searchAllAtom);

  const [search, setSearch] = React.useState("");
  const [dataSearch, setDataSearch] = React.useState<any>(null);
  const onChange = ({ target }) => setSearch(target.value);

  const pathUrl = window.location.pathname.split("/");
  const decoded = cookies.get('decoded');
  // const userName = decoded.username || 'User';
  const userName = 'User';
  // const bgColor = decoded.bgColor || 'rgb(76 175 80)';
  const bgColor = "rgb(76 175 80)";

  const [isOpenSignOut, setIsOpenSignOut] = React.useState<boolean>(false);

  const handleOpenSignout = () => {
    setIsOpenSignOut(true);
  };

  const handleOkSignout = () => {
    cookies.remove('token');
    cookies.remove('decoded');
    setIsOpenSignOut(false);
    navigate('/signin');
  }

  React.useEffect(() => {
    if (pathUrl[1] === "dashboard") {
      const delaySearch = setTimeout(() => {
        if (searchAll.length > 1) {
          const dataFilter = routes.filter((data) =>
            data.layout.toUpperCase().includes(searchAll.toUpperCase())
          );
          setDataSearch(dataFilter);
        } else setDataSearch(null);
      }, 1000);

      return () => clearTimeout(delaySearch);
    } else {
      setDataSearch(null);
    }
  }, [searchAll, pathUrl]);

  React.useEffect(() => {
    if (!dataSearch) setSearch("");
  }, [dataSearch]);

  React.useEffect(() => {
    setSearchAll(search);
  }, [search]);

  return (
    <>
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${
          fixedNavbar
            ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
            : "px-0 py-1"
        }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <Breadcrumbs
              className={`bg-transparent p-0 transition-all ${
                fixedNavbar ? "mt-1" : ""
              }`}
            >
              <Link to={`/${layout}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" color="blue-gray">
              {page}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="mr-auto md:mr-4 md:w-56">
              <div className="relative flex w-full max-w-[26rem]">
                <Input
                  type="email"
                  label="Search"
                  color="green"
                  value={search}
                  onChange={onChange}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  crossOrigin={undefined}
                />
                <MagnifyingGlassIcon
                  color={!search ? "gray" : "green"}
                  className="!absolute right-3 top-2.5 h-5 w-5 rounded"
                />
                {dataSearch && (
                  <Card
                    className={
                      "!absolute right-0  top-11 z-50 w-56 gap-4 rounded"
                    }
                  >
                    {dataSearch.map((data, index) => (
                      <div key={index} className="gap-4">
                        {data.pages.map((value, index) => (
                          <Link
                            to={`/${data.layout}${value.path}`}
                            className={
                              "flex cursor-pointer flex-row p-2 hover:bg-green-100"
                            }
                          >
                            <Typography
                              key={index}
                              variant="small"
                              className="text-[13px] font-bold uppercase text-black"
                            >
                              {data.layout}
                            </Typography>
                            <Typography
                              key={index}
                              variant="small"
                              className="cursor-pointer text-[13px] text-black"
                            >
                              {value.path}
                            </Typography>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </Card>
                )}
              </div>
            </div>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
            </IconButton>

            {/* <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton> */}
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0">
                <MenuItem className="flex items-center gap-3">
                  <Avatar
                    src="data:image/jpeg;base64,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"
                    alt="item-1"
                    size="sm"
                    variant="circular"
                  />
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      <strong>New request onleave</strong> from Jisoo
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4">
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61UuvSczcpPEFgoB32lo8vK6cueMWlyY3xQ&usqp=CAU"
                    alt="item-1"
                    size="sm"
                    variant="circular"
                  />
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      <strong>Onleave request approved</strong> by Rose
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-4">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-green-800 to-green-700">
                    <CheckBadgeIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      Clock in success !
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                    </Typography>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <div
                  className="w-10 h-10 border rounded-full flex justify-center items-center cursor-pointer"
                  style={{ backgroundColor: bgColor }}
                >
                  <Typography className="text-gray-200 uppercase" variant="h6">
                    {getInitialLetter(userName)}
                  </Typography>
                </div>
              </MenuHandler>
              <MenuList className="w-max border-0">

                <MenuItem className="flex flex-row gap-3">
                <div>
                  <ArrowLeftOnRectangleIcon color={"gray"} className="w-5 h-5" />
                </div>
                <div onClick={handleOpenSignout}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                      >
                    Sign Out
                  </Typography>
                </div>
                </MenuItem>

              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>

      <Modal
        open={isOpenSignOut}
        header={""}
        handleClose={() => setIsOpenSignOut(false)}
        body={<div className="text-center">Are you sure want to sign out <strong>{userName}</strong> ?</div>}
        footer={
          <div className="flex flex-row-reverse">
              <Button
                variant="filled"
                color={'green'}
                className={'p-2 w-28 ml-4 mb-4 content-center'}
                onClick={handleOkSignout}
              >
                <Typography
                    variant="small"
                    className="font-bold uppercase text-white text-center"
                  >
                    {'Yes'}
                  </Typography>
              </Button>
              <Button
                variant="filled"
                color={'red'}
                className={'p-2 w-28 ml-4 mb-4 content-center	'}
                onClick={() => setIsOpenSignOut(false)}
              >
                <Typography
                    variant="small"
                    className="font-bold uppercase text-white text-center"
                  >
                    {'No'}
                  </Typography>
              </Button>
          </div>
        }
      />
    </>
  );
}
