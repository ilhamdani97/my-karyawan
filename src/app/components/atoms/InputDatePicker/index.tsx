import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  value: string | Date;
  label: string;
  onChange: (e: any) => void;
}

const InputDatePicker = ({ value, label, onChange }: Props) => {
  interface Props {
    value: string | Date;
    disable: boolean;
    label: string;
    onClick?: () => void;
  }
  const CustomInput = ({ value, disable, label, onClick }: Props) => {
    return (
      <Input
        disabled={disable}
        value={value}
        size="lg"
        label={label}
        color="green"
        icon={<i className="fas fa-calendar cursor-pointer" onClick={onClick} />}
        crossOrigin={undefined}      />
    );
  };

  return (
    <DatePicker
      selected={value}
      customInput={<CustomInput value={value} disable={false} label={label} />}
      onChange={(date) => onChange(date)}
      popperPlacement="bottom"
    />
  );
};

export default InputDatePicker;