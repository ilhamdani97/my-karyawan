import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import {
  attendanceCardsData,
  attendanceChartsData,
  top5LateTableData,
  top5LateDepartmentTableData,
} from "@/app/data";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataDummyRecoils } from "@/store/Atendance/atom";
import { StatisticsCard, StatisticsChart } from "@/app/components";

export function Home() {
  // use Recoil
  const data = useRecoilValue(dataDummyRecoils);

  return (
    <div className="mt-4">
      <div className="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:gap-x-5 xl:grid-cols-6">
        {attendanceCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={<img src={icon} alt="Icon" className="h-6 w-6" />}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-between">
        {attendanceChartsData.map((props) => (
          <div
            key={props.title}
            className={`mb-6 grid w-full grid-cols-1 gap-y-12 gap-x-6 p-4 lg:w-1/2`}
          >
            <StatisticsChart
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          </div>
        ))}
      </div>
      <div className="my-4 grid grid-cols-1 gap-x-8 gap-y-10 md:px-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Top 5 Employees by Absence
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2 scrollbar-hide">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {["Employee", "Department", "Clock IN"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {top5LateTableData.map(
                  ({ img, name, department, clockin }, key) => {
                    const className = `py-3 px-5 ${
                      key === top5LateTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {department}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {clockin}
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Top 5 Late by Department
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2 scrollbar-hide">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {["Department", "Percentage Late"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {top5LateDepartmentTableData.map(
                  ({ department, progress }, key) => {
                    const className = `py-3 px-5 ${
                      key === top5LateDepartmentTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={department}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              color="blue-gray"
                              className="text-sm font-bold"
                            >
                              {department}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Progress
                              value={progress}
                              variant="gradient"
                              color={progress === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                            <Typography className="mb-1 block text-xs font-medium text-blue-gray-600">
                              {progress}%
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
