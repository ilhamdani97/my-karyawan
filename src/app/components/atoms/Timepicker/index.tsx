import * as React from 'react';
import TimeKeeper from 'react-timekeeper';
import { Input } from "@material-tailwind/react"

export interface ITimePickerProps {
  onChange: (e: any) => void 
  time: string
  showTime: boolean
  onDoneClick(): void
  label?: string
  onClick: () => void
}

export default function TimePicker ({
  onChange,
  time = '12:34pm',
  showTime = false,
  onDoneClick,
  label = 'Time',
  onClick,
}: ITimePickerProps) {

  return (
    <>
      <Input
        size="lg"
        label={label}
        color="green"
        icon={<i className="fas fa-clock cursor-pointer" onClick={onClick} />}
        onFocus={onClick}
        value={time}
      />
      {showTime && 
        <TimeKeeper
          time={time}
          onChange={onChange}
          onDoneClick={onDoneClick}
          switchToMinuteOnHourSelect
        />
      }
    </>

);
}
