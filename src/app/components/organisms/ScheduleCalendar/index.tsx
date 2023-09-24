import { Tooltip } from "@material-tailwind/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface Props {
    dataScadule?: Array<string>
}
const dateArray = ["Meeting 08:00", "", "Meeting 08:00", "", "Meeting 08:00","Meeting 08:00", "", "Meeting 08:00", "", "Meeting 08:00","Meeting 08:00", "", "Meeting 08:00", "", "Meeting 08:00","Meeting 08:00", "", "Meeting 08:00", "", "Meeting 08:00","Meeting 08:00", "", "Meeting 08:00", "", "Meeting 08:00","Meeting 08:00", "", "Meeting 08:00", "", "Meeting 08:00", ""]
const ScheduleCalendar = ({
    dataScadule
}: Props) => {

    const [totalDate, setTotalDate] = useState<number>(0);
    const dateNow = parseInt(moment().format('DD'))
    useEffect(() => {
        const totalDate = moment(new Date()).daysInMonth();
        setTotalDate(totalDate);
    }, [])
    return (
        <div className="mx-auto mt-10">
            <div className="wrapper bg-white rounded shadow w-full ">
                <div className="header flex justify-between border-b p-2">
                    <span className="text-lg font-bold">
                        {`${moment().format('MMMM')} ${moment().format('YYYY')}`}
                        {/* Agustus 2023 */}
                    </span>
                    <div className="buttons">
                        <button className="p-1">
                            {/* todo button next  */}
                            {/* <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" fil="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"/>
                                <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
                            </svg> */}
                        </button>
                        <button className="p-1">
                            {/* <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
                                <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
                            </svg> */}
                        </button>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Sunday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
                            </th>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Monday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
                            </th>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Tuesday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
                            </th>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Wednesday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
                            </th>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Thursday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
                            </th>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Friday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
                            </th>
                            <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                <span className="xl:block lg:block md:block sm:block hidden">Saturday</span>
                                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({length: totalDate}, (_, index) =>  (
                            <>
                                {index % 7 === 0 && (
                                    <tr key={index} className="text-center h-20 mb-4">
                                        {dateArray.slice(index, index + 7).map((data, i) => (
                                            <td className={`border p-1 h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 overflow-auto transition cursor-pointer duration-500 ease bg-gray-100 hover:bg-blue-100 ${(index + (i + 1)) === dateNow ? 'bg-blue-100' : ''} `}>
                                                <div className="flex flex-col h-40 2xl:w-32	xl:w-30	lg:w-24 md:w-12 sm:w-6 w-8 mx-auto overflow-hidden">
                                                    {/* content  */}
                                                    <div className="top h-5 w-full">
                                                        <span className="text-gray-500">{index + (i + 1)}</span>
                                                    </div>
                                                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                                                        {data && (
                                                            <Tooltip content="Meeting 2:00~14:00">
                                                                <div className="event bg-purple-400 text-white rounded p-1 text-xs mb-1">
                                                                    <span className="event-name">
                                                                        Meeting
                                                                    </span>
                                                                    <span className="time">
                                                                        12:00~14:00
                                                                    </span>
                                                                </div>
                                                            </Tooltip>
                                                        )}
                                                        
                                                    </div>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ScheduleCalendar;