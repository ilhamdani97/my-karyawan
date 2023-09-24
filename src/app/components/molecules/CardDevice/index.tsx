import { useState } from "react";
import { 
    ChevronDownIcon, 
    ClockIcon, 
    ComputerDesktopIcon, 
    DevicePhoneMobileIcon, 
    PencilIcon, 
    UsersIcon,
    ChevronUpIcon,
    ArrowPathIcon,
    SignalSlashIcon
} from "@heroicons/react/24/solid";
import { Card, CardBody, Tooltip, Typography } from "@material-tailwind/react";
import moment from "moment";

interface Props {
    list: ListDataDevice;
    onClickEdit: () => void;
    onClickDelete: () => void;
    onClickSync: () => void;
    loadingSync: boolean;
}

const CardDevice = ({
    list,
    onClickDelete,
    onClickEdit,
    onClickSync,
    loadingSync
}: Props) => {

    const [showAll, setShowAll] = useState<boolean>(false);

    return (
        <Card className={ `${showAll ? 'max-h-80 xl:max-h-60': 'max-h-40'}`}>
          <CardBody >
            <div className={'flex flex-row justify-between'}>
              <div className="flex flex-row">
                <div className={'bg-blue-gray-100 w-20 h-20 flex items-center justify-center rounded-full p-2'}>
                    <img
                        src={'img/icon/fingerprint.png'}
                        alt="card-image"
                        className={'h-10 w-10'}
                    />
                </div>
                <div className={'flex flex-col ml-4'}>
                  <div className={'flex flex-row justify-between gap-2'}>
                    <div className={`${list.isRegister ? 'bg-green-500' : 'bg-red-500'} p-1 rounded-3xl w-24`}>
                        <Typography className={'text-center'} variant="small" color="white">
                        {list.isRegister ? 'Connected' : 'Disconnected'}
                        </Typography>
                    </div>
                    <div>
                        <div className={'bg-blue-500 p-1 rounded-3xl w-32'}>
                            <Typography className={'text-center'} variant="small" color="white">
                                {list.deviceSn}
                            </Typography>
                        </div>
                    </div>
                  </div>

                  <Typography className={'line-clamp-1'} variant="lead">
                    {list.deviceAlias}
                  </Typography>
                  <Typography className={'line-clamp-1'} variant="small">
                    {list.areaName}
                  </Typography>
                </div>
              </div>
              <div>
                <div className={'flex flex-row gap-2'}>
                    <Tooltip 
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}
                        content={
                            
                            `Sync Biometric Device ${list.deviceAlias}`
                        }>
                        <ArrowPathIcon
                            strokeWidth={10}
                            onClick={onClickSync}
                            color="#60a5fa" 
                            className={`w-4 h-4 cursor-pointer ${loadingSync && 'animate-spin'} `}
                        />
                    </Tooltip>
                  <PencilIcon 
                    onClick={onClickEdit}
                    color="#66BB6A" 
                    className={'w-4 h-4 cursor-pointer'}
                  />
                  <Tooltip 
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}
                        content={
                            
                            `Disconnect Device ${list.deviceAlias}`
                        }>
                            <SignalSlashIcon 
                            onClick={onClickDelete} 
                            color="#ef5350" 
                            className={'w-4 h-4 cursor-pointer'}
                        />
                    </Tooltip>
                  
                </div>
                {showAll ? (
                    <ChevronUpIcon
                        onClick={()=> setShowAll(!showAll)}
                        color={'#616161'}
                        className={'w-6 ml-4 mt-4 h-6 cursor-pointer'}
                    />
                ):(
                    <ChevronDownIcon
                        onClick={()=> setShowAll(!showAll)}
                        color={'#616161'}
                        className={'w-6 ml-4 mt-4 h-6 cursor-pointer'}
                    />
                )}
                
              </div>
            </div>
            {showAll && (
                <div className={'border-t mt-4 border-gray-400'}>
                    <div className={'grid gap-2 md:grid-cols-2 xl:grid-cols-2'}>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <UsersIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {list.totalEnrolledUser}
                            </Typography>
                            <Typography variant={'small'}>
                                {'Users'}
                            </Typography>
                        </div>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <ComputerDesktopIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {list.deviceIp}
                            </Typography>
                            <Typography variant={'small'}>
                                {'Local IP'}
                            </Typography>
                        </div>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <DevicePhoneMobileIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {list.deviceName}
                            </Typography>
                        </div>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <ClockIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {moment(list.lastHeartbeat).format('hh:mm:ss A')}
                            </Typography>
                            
                            <Typography variant={'small'}>
                                {'Last synchronized'}
                            </Typography>
                        </div>
                    </div>
                </div>
            )}
            
          </CardBody>
        </Card>
    )
}

export default CardDevice;