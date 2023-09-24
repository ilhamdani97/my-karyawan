import * as React from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    IconButton
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  ArrowRightIcon, 
  ArrowLeftIcon,
  PlusIcon
} from "@heroicons/react/24/solid";
import { authorsTableData } from "@/app/data";
import { content, dataHeader } from "@/app/data/workshop-approval";
import { HeaderBack } from '@/app/components';
import Pagination from '@/app/components/molecules/pagination';
export interface IWorkshopProps {
}

export default function Workshop (props: IWorkshopProps) {
    const [active, setActive] = React.useState(1);
 
    const getItemProps = (index) =>
      ({
        variant: active === index ? "filled" : "text",
        color: active === index ? "green" : "blue-gray",
        onClick: () => setActive(index),
      } as any);
   
    const next = () => {
      if (active === 5) return;
   
      setActive(active + 1);
    };
   
    const prev = () => {
      if (active === 1) return;
   
      setActive(active - 1);
    };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card>
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6 flex flex-row gap-4">
        <HeaderBack />
        <Typography variant="h6" color="white">
          {'Workshop'}
        </Typography>
      </CardHeader>
      <Button
        variant="filled"
        color={'blue'}
        className={'p-2 w-20 ml-4 flex mb-4' }
        onClick={prev}
      >
        <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
        <Typography
            variant="small"
            className="font-bold uppercase text-white "
          >
            {'ADD'}
          </Typography>
      </Button>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {dataHeader.map((data) => (
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
              ({ date, name, type, reason, startDate, endDate, status }, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {date}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        >
                        {name}
                        </Typography>
                    </td>

                    <td className={className}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        >
                            {type}
                        </Typography>
                    </td>
                    <td className={className}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        >
                            {reason}
                        </Typography>
                    </td>
                    <td className={className}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        >
                            {startDate}
                        </Typography>
                    </td>
                    <td className={className}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        >
                            {endDate}
                        </Typography>
                    </td>
                    <td className={className}>
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        >
                            {status}
                        </Typography>
                    </td>
                    
                    <td className={className}>
                      <div className="flex gap-4">
                        <PencilIcon color="#66BB6A" className={'w-4 h-4 cursor-pointer'}/>
                        <TrashIcon color="#ef5350" className={'w-4 h-4 cursor-pointer'}/>
                      </div>
                    </td>
                    
                  </tr>
                );
              }
            )}
            
          </tbody>
        </table>
        <Pagination onChange={() => {}} />
      </CardBody>
    </Card>
  </div>
  );
}
