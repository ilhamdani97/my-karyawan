import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Input,
  Spinner,
  Checkbox,
  Option,
  Switch,
} from "@material-tailwind/react";
import { InputDatePicker } from "@/app/components";
import makeAnimated from 'react-select/animated';
import Select, { 
  components,
 } from 'react-select'

export interface IEmployeeProps {

  addClicked?: boolean,
  handleEdit?: () => void
  isLoading?: boolean
  handleSave?: () => void
  onEdit?: () => void
  form?: any;
  setForm?: any;
  dataPosition?: any
  dataArea?: any
  dataSubscribe?: any
}

export default function AddEmployee({
  addClicked,
  handleEdit,
  isLoading,
  handleSave,
  onEdit,
  form,
  setForm,
  dataArea,
  dataSubscribe,
  dataPosition,
}: IEmployeeProps) {
  const dataReligion = [
    {
      label: "Islam",
      value: "islam",
    },
    {
      label: "Kristen",
      value: "kristen",
    },
    {
      label: "Katolik",
      value: "katolik",
    },
    {
      label: "Hindu",
      value: "hindu",
    },
    {
      label: "Budha",
      value: "budha",
    },
    {
      label: "Konghuchu",
      value: "konghuchu",
    },
  ];

  const dataWorkType = [
    {
      workTypeName: "On Site",
      workTypeId: "WT-1"
    },
    {
      workTypeName: "WFH",
      workTypeId: "WT-2"
    },
    {
      workTypeName: "Hybrid",
      workTypeId: "WT-3"
    },
  ]

  const employeeType = [
    {
      employeeTypeName: "Full Time",
      employeeTypeCode: "type-1"
    },
    {
      employeeTypeName: "Intern",
      employeeTypeCode: "type-2"
    },
    {
      employeeTypeName: "Kontrak",
      employeeTypeCode: "type-3"
    },
  ]

  const optionsGender = [
    { value: 'perempuan', label: 'Perempuan' },
    { value: 'laki-laki', label: 'Laki-laki' },
  ]

  const optionsResign = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ]
  
  const [selectedOption, setSelectedOption] = useState<Array<object> | null>(null);
  
  const [isMobile, setIsMobile] = useState<number>(1)

  const animatedComponents = makeAnimated();
  
  const handleInputChange = (event) => {
    setForm((prevValue) => {
      return{
        ...prevValue,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSwitchChange = () => {
    const newValue = isMobile === 0 ? 1 : 0;
    setIsMobile(newValue);
    setForm((prevValue)=>{
      return{
        ...prevValue,
        accountTypeId: isMobile
      }
    })
  };  
  
  useEffect(()=>{
    if(form) {
      const dataAreas = form.areaName.split(',').map(value => value.trim());
      const dataAreasCode = form.areaCode.split(',').map(value => value.trim());
      const objectArea = dataAreas.map((value, index) => ({
        value: dataAreasCode[index],
        label: value,
      }));
      setSelectedOption(objectArea);
    }
  },[])

  const handleSelected = (selectedOptions) => {
    const selectedAreaCodes = selectedOptions.map(
      (option: any) => option.value
    );
    setSelectedOption(selectedOptions);
    setForm((prevValue) => {
      return {
        ...prevValue,
        areaName: selectedOptions.map(
          (option: any) => option.label
        ),
        areaCode: selectedAreaCodes,
      };
    });
  }

  const handleSelectChange = (field, selectedOptions) => {
    if (selectedOptions) {
      setForm((prevValue) => ({
        ...prevValue,
        [`${field}Id`]: selectedOptions.value,
        [`${field}Code`]: selectedOptions.value,
        [`${field}Name`]: selectedOptions.label,
      }));
    } else {
      setForm((prevValue) => ({
        ...prevValue,
        [`${field}Code`]: "",
        [`${field}Name`]: "",
      }));
    }
  };

  const generateSelectOptions = (data, valueKey, labelKey) => {
    return (data || []).map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  };
  
  const generatePositionOptions = (dataPosition) => {
    if (dataPosition && dataPosition.length > 0) {
      return dataPosition.map((position) => ({
        value: [position.departmentCode, ' - ', position.positionCode],
        label: [position.departmentName, ' - ', position.positionName],
      }));
    } else {
      return [
        {
          value: "",
          label: "Data Position is Empty",
        },
      ];
    }
  };

  const handlePositionChange = (selectedOptions) => {
    if (selectedOptions) {
      const [departmentCode, , positionCode] = selectedOptions.value;
      const [departmentName, , positionName] = selectedOptions.label;
      setForm((prevValue) => ({
        ...prevValue,
        positionCode,
        positionName,
        departmentCode,
        departmentName,
      }));
    } else {
      setForm((prevValue) => ({
        ...prevValue,
        positionCode: "",
        positionName: "",
        departmentCode: "",
        departmentName: "",
      }));
    }
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  }
    
  return (
    <div className="inset-2 mb-8 flex flex-col gap-12">
      <form className="p-5">
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-2">
          <Input
            name="employeeId"
            defaultValue={form.employeeId}
            label="ID Employee"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="employeeName"
            defaultValue={form.employeeName}
            label="Name"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />

          {addClicked ? (
            <>
              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                placeholder="Gender"
                isClearable={true}
                options={optionsGender}
                onChange={(selectedOption) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      gender: selectedOption?.value,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Birthday"
                value={form.birthday}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      birthday: date,
                    };
                  });
                }}
              />
            </>
          ) : (
            <>
              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                value={{
                  value: form.gender,
                  label: form.gender,
                }}
                placeholder="Gender"
                isClearable={true}
                options={optionsGender}
                onChange={(selectedOption) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      gender: selectedOption?.value,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Birthday"
                value={new Date(form.birthday)}
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      birthday: date,
                    };
                  });
                }}
              />
            </>
          )}

          <Input
            name="emailAddress"
            defaultValue={form.emailAddress}
            type="email"
            label="E-Mail"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="phoneNumber"
            defaultValue={form.phoneNumber}
            type="number"
            label="Phone Number"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="address"
            defaultValue={form.address}
            label="Address"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="postalCode"
            defaultValue={form.postalCode}
            label="Postal Code"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />

          <Input
            name="national"
            defaultValue={form.national}
            label="Nationality"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />

          {addClicked ? (
            <>
              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                placeholder="Religion"
                isClearable={true}
                options={dataReligion}
                onChange={(selectedOption) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      religion: selectedOption?.value,
                    };
                  });
                }}
              />
              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                isClearable={true}
                placeholder="Employee Area"
                isMulti
                components={animatedComponents}
                options={
                  dataArea && dataArea.length > 0
                    ? dataArea?.map((area) => ({
                        value: area.areaCode,
                        label: area.areaName,
                      }))
                    : [
                        {
                          value: "",
                          label: "Data Area is Empty",
                        },
                      ]
                }
                onChange={(selected) => handleSelected(selected)}
              />
              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                placeholder="Employee Type"
                isClearable={true}
                options={generateSelectOptions(employeeType, "employeeTypeCode", "employeeTypeName")}
                onChange={(selectedOptions) => handleSelectChange("employeeType", selectedOptions)}
              />

              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                isClearable={true}
                placeholder="Work Type"
                components={animatedComponents}
                options={generateSelectOptions(dataWorkType, "workTypeId", "workTypeName")}
                onChange={(selectedOptions) => handleSelectChange("workType", selectedOptions)}
              />

              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                isClearable={true}
                placeholder="Position Name"
                components={animatedComponents}
                options={generatePositionOptions(dataPosition)}
                onChange={handlePositionChange}
              />

              <InputDatePicker
                label="Join Date"
                value={form.joinDate}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      joinDate: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Effective Start"
                value={form.effectiveStart}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      effectiveStart: date,
                    };
                  });
                }}
              />
            </>
          ) : (
            <>
              <Select
                className="text-sm"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary: "green",
                  },
                })}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    textTransform: "capitalize",
                  }),
                }}
                value={{
                  value: form.religion,
                  label: form.religion,
                }}
                placeholder="Religion"
                isClearable={true}
                options={dataReligion}
                onChange={(selectedOption) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      religion: selectedOption?.value,
                    };
                  });
                }}
              />
              <Select
                className="text-sm"
                isClearable={true}
                placeholder="Employee Area"
                isMulti
                components={animatedComponents}
                options={
                  dataArea
                    ? dataArea?.map((area) => ({
                        value: area.areaCode,
                        label: area.areaName,
                      }))
                    : { value: "", label: "Data Area is Empty" }
                }
                value={selectedOption}
                onChange={(selected) => handleSelected(selected)}
              />

              <Select
                className="text-sm"
                isClearable={true}
                placeholder="Employee Type"
                components={animatedComponents}
                value={{
                  value: form.employeeTypeCode,
                  label: form.employeeTypeName,
                }}
                options={generateSelectOptions(employeeType, "employeeTypeCode", "employeeTypeName")}
                onChange={(selectedOptions) => handleSelectChange("employeeType", selectedOptions)}
              />

              <Select
                className="text-sm"
                isClearable={true}
                placeholder="Work Type"
                components={animatedComponents}
                value={{
                  value: form.workTypeId,
                  label: form.workTypeName,
                }}
                options={generateSelectOptions(dataWorkType, "workTypeId", "workTypeName")}
                onChange={(selectedOptions) => handleSelectChange("workType", selectedOptions)}
              />

              <Select
                className="text-sm"
                isClearable={true}
                placeholder="Position Name"
                components={animatedComponents}
                value={{
                  value: [form.departmentCode, " - " ,form.positionCode],
                  label: [form.departmentName, " - " ,form.positionName],
                }}
                options={generatePositionOptions(dataPosition)}
                onChange={handlePositionChange}
              />

              <InputDatePicker
                label="Join Date"
                value={!form.joinDate ? new Date() : new Date(form.joinDate)}
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      joinDate: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Effective Start"
                value={
                  !form.effectiveStart
                    ? new Date()
                    : new Date(form.effectiveStart)
                }
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      effectiveStart: date,
                    };
                  });
                }}
              />
            </>
          )}
          <Input
            name="bankName"
            defaultValue={form.bankName}
            label="Bank Name"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <Input
            name="bankAccount"
            defaultValue={form.bankAccount}
            label="Bank Account"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <Input
            name="paymentMethod"
            defaultValue={form.paymentMethod}
            label="Payment Method"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <Input
            name="npwpNo"
            defaultValue={form.npwpNo}
            label="NPWP"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />

          {addClicked ? (
            <InputDatePicker
              label="Tax Start Pay"
              value={form.taxStartPay}
              onChange={(date: Date) => {
                setForm((prevValue) => {
                  return {
                    ...prevValue,
                    taxStartPay: date,
                  };
                });
              }}
            />
          ) : (
            <>
              <InputDatePicker
                label="Tax Start Pay"
                value={
                  !form.taxStartPay ? new Date() : new Date(form.taxStartPay)
                }
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      taxStartPay: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Tax End Pay"
                value={!form.taxEndPay ? new Date() : new Date(form.taxEndPay)}
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      taxEndPay: date,
                    };
                  });
                }}
              />
            </>
          )}
          <Input
            name="bpjsEmployeeNo"
            defaultValue={form.bpjsEmployeeNo}
            label="BPJS Employe Number"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />

          <Input
            name="bpjsHealthCareNo"
            defaultValue={form.bpjsHealthCareNo}
            // type="number"
            label="BPJS Health Care Number"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />

          {addClicked ? (
            <>
              <InputDatePicker
                label="BPJS Employee Start Pay"
                value={form.bpjsEmployeeStartPay}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      bpjsEmployeeStartPay: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="BPJS Health Care Start Pay"
                value={form.bpjsHealthCareStartPay}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      bpjsHealthCareStartPay: date,
                    };
                  });
                }}
              />
            </>
          ) : (
            <>
              <InputDatePicker
                label="BPJS Employee Start Pay"
                value={
                  !form.bpjsEmployeeStartPay
                    ? new Date()
                    : new Date(form.bpjsEmployeeStartPay)
                }
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      bpjsEmployeeStartPay: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="BPJS Health Care Start Pay"
                value={
                  form.bpjsHealthCareStartPay
                    ? new Date(form.bpjsHealthCareStartPay)
                    : new Date()
                }
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      bpjsHealthCareStartPay: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="BPJS Employee End Pay"
                value={
                  !form.bpjsEmployeeEndPay
                    ? new Date()
                    : new Date(form.bpjsEmployeeEndPay)
                }
                onChange={(date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      bpjsEmployeeEndPay: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="BPJS Health Care End Pay"
                value={
                  !form.bpjsHealthCareEndPay
                    ? new Date()
                    : new Date(form.bpjsHealthCareEndPay)
                }
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      bpjsHealthCareEndPay: date,
                    };
                  });
                }}
              />
              <Select
                placeholder="Status Resign"
                isClearable={true}
                options={optionsResign}
                onChange={(selectedOption) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      isResign: selectedOption?.value,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Resign Date"
                value={
                  !form.resignDate ? new Date() : new Date(form.resignDate)
                }
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      resignDate: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Effective End"
                value={
                  !form.effectiveEnd ? new Date() : new Date(form.effectiveEnd)
                }
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      effectiveEnd: date,
                    };
                  });
                }}
              />
            </>
          )}
          {addClicked ? (
            <Switch
              color="green"
              label="Include Mobile"
              disabled={!dataSubscribe || dataSubscribe.length === 0 ||
                dataSubscribe[0].appsUsed >= dataSubscribe[0].appsTotal}
              crossOrigin={undefined}
              checked={isMobile === 0}
              value={form.accountTypeId}
              onChange={handleSwitchChange} defaultValue={undefined}            />
          ) : (
            <Switch
                color="green"
                label="Include Mobile"
                disabled={!dataSubscribe || dataSubscribe.length === 0 ||
                  dataSubscribe[0].appsUsed >= dataSubscribe[0].appsTotal}
                crossOrigin={undefined}
                checked={isMobile === 0}
                value={form.accountTypeId}
                onChange={handleSwitchChange} defaultValue={undefined}          />
          )}
        </div>
        <div
          className={`${addClicked ? "mt-0" : "mt-5"} flex flex-row-reverse`}
        >
          <Button
            variant="filled"
            color={"green"}
            disabled={isLoading ||
              (!form.employeeId &&
                !form.employeeName &&
                !form.departmentCode &&
                !form.departmentName &&
                !form.positionCode &&
                !form.positionName &&
                !form.gender &&
                !form.birthday &&
                !form.phoneNumber &&
                !form.address &&
                !form.national &&
                !form.religion &&
                !form.emailAddress)}
            className={"ml-4 mb-4 flex w-28 flex-row justify-center p-2"}
            onClick={addClicked ? handleSave : onEdit} defaultValue={undefined}          >
            {isLoading ? (
              <>
                <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                <Typography
                  variant="small"
                  className="text-center font-bold uppercase text-white"
                >
                  {"Loading"}
                </Typography>
              </>
            ) : (
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"Save"}
              </Typography>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
