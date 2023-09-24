import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { authorsTableData } from "@/app/data";
import { content, dataTable } from "@/app/data/attendance";
import { IFrame } from "@/app/components";

export function Attendance(): JSX.Element {
  const [active, setActive] = React.useState<number>(1);

  const [iframeState, setIFrameState] = useState<{
    showIFrameForm: boolean;
    varname: string;
    varphoto: string;
    varaddress: string;
    varclockin: string;
    varlate: boolean;
  }>({
    showIFrameForm: false,
    varname: "",
    varphoto: "",
    varaddress: "",
    varclockin: "",
    varlate: false,
  });

  const handleClose = () => {
    setIFrameState({
      showIFrameForm: false,
      varname: "",
      varphoto: "",
      varaddress: "",
      varclockin: "",
      varlate: false,
    });
  };
  const getItemProps = (index: number) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
  });

  const next = (): void => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = (): void => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const [showFullText, setShowFullText] = useState(false);

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {"Attendance"}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 scrollbar-hide">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {dataTable.map((data) => (
                  <th
                    key={data}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {data}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.map(
                (
                  {
                    name,
                    date,
                    clockin,
                    late,
                    clockout,
                    address,
                    typeDevice,
                    department,
                    shift,
                    photo,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color={late ? "red" : "green"}
                          className="text-xs font-semibold"
                        >
                          {clockin}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {clockout}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`text-xs font-semibold`}
                        >
                          {address.length > 20
                            ? `${address.slice(0, 20)} ...`
                            : address}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {typeDevice}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {department}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {shift}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex justify-center">
                          <EyeIcon
                            color="#66BB6A"
                            className="h-4 w-4 cursor-pointer"
                            onClick={() =>
                              setIFrameState({
                                ...iframeState,
                                showIFrameForm: true,
                                varname: name,
                                varphoto: photo,
                                varaddress: address,
                                varclockin: clockin,
                                varlate: late,
                              })
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <div className="m-4 flex items-center gap-4">
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <IconButton {...getItemProps(1)}>1</IconButton>
              <IconButton {...getItemProps(2)}>2</IconButton>
              <IconButton {...getItemProps(3)}>3</IconButton>
              <IconButton {...getItemProps(4)}>4</IconButton>
              <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2"
              onClick={next}
              disabled={active === 5}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </CardBody>
      </Card>
      <IFrame
        open={iframeState.showIFrameForm}
        handleClose={handleClose}
        name={iframeState.varname}
        url={iframeState.varphoto}
        address={iframeState.varaddress}
        clockin={iframeState.varclockin}
        late={iframeState.varlate}
      />
    </div>
  );
}

export default Attendance;
