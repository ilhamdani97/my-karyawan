import { useEffect, useState } from "react";
import { HeaderBack } from "@/app/components";
import { Card, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import { getDataPayroll } from "@/app/services/payroll";
import { GetDataPayrollResponse, GetPayrollResponse } from "@/interface/payroll";
import { addDotSeparator } from "@/utils/general";
import CreatePayroll from "./components/CreatePayroll";
import ModelPayroll from "./components/ModelPayroll";

export function Payroll() {
  const [dataPayroll, setDataPayroll] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [form, setForm] = useState({
    positionId: '',
    positionName: '',
});

const [properties, setProperties] = useState([
  {name: '', amount: ''}
]);

  const handleClickKeyTab = (id) => {
    setActiveTab(id);
  }

  const getPayrollAll = async () => {
    setIsLoading(true);
    try {
        const dataAll = await getDataPayroll() as GetPayrollResponse;
        const tempData = [...dataAll.data];

        const data = tempData.reduce((acc: any, curr: any) => {
          const newProperties = Object.entries(curr.properties).map(([name, amount] : any) => {
            return ({ name, amount: addDotSeparator(amount) });
          });
          acc.push({
            ...curr,
            department: curr.positionName.split("-")[0].trim(),
            position: curr.positionName.split("-")[1].trim(),
            properties: newProperties,
          })
          return acc;
        }, [])

        const groupedData = data.reduce((acc: any, curr: any) => {
          if (!acc[curr.department]) {
            acc[curr.department] = []
          }

          acc[curr.department].push(curr);

          return acc;
        }, {})

        const res = Object.entries(groupedData).map(([department, options]) => {
          return ({
            department,
            options
          })
        })

        setDataPayroll(res);
        setIsLoading(false);
    } catch (err) {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    getPayrollAll();
  }, []);

  const [keyTab, setKeyTab] = useState<Array<Object>>([
    {
      id: 1,
      label: dataEdit ? "Edit Payroll Model" : "Create Payroll Model",
      value: "createModelPayroll",
    },
    {
      id: 2,
      label: "Payroll Model",
      value: "modelPayroll",
    },
 
    {
      id: 3,
      label: "Payroll Employee",
      value: "payrollEmployee",
    }
  ]);



  return (
    <div className="mt-6 flex flex-col gap-4 ">
      <Card variant="gradient" color="blue" className="mb-1 p-6 flex flex-row gap-4">
        <HeaderBack />
        <Typography variant="h6" color="white">
          {'Payroll'}
        </Typography>
      </Card>

      {/* Start New Tabs */}
      <div className="flex flex-row space-between m-1">
        {keyTab.map((list: any, index: number) => {

          return (
              <div
                key={`keyTab-header-${index}`}
                data-testid="keyTab"
                className={`w-full text-center cursor-pointer flex justify-center items-center ${activeTab === list.id && 'inset-0 z-10 h-11 bg-white rounded-md shadow'}`}
                onClick={() => handleClickKeyTab(list.id)}
              >
                <Typography variant={'h4'} color={'blue'}>
                  {list.label}
                </Typography>   

              </div>
          )
        })}
      </div>

      <div className="inset-0 z-10 h-full bg-white rounded-md shadow">
        {keyTab.map((list: any, index: number) => {
          return (
            <>
              {activeTab === list.id && (
                <div key={`keyTab-content-${index}`}>
                  {list.id === 1 && <CreatePayroll getPayrollAll={getPayrollAll} dataEdit={dataEdit} setDataEdit={setDataEdit} form={form} setForm={setForm} properties={properties} setProperties={setProperties} />}
                  {list.id === 2 && <ModelPayroll dataPayroll={dataPayroll} getPayrollAll={getPayrollAll} setActiveTab={setActiveTab} setDataEdit={setDataEdit} setForm={setForm} setProperties={setProperties} isLoadingPayroll={isLoading} />}
                  {list.id === 3 && <div className="p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>}
                </div>
              )}
            </>
          )
        })}
      </div>

      {/* End New Tabs */}

    </div>
  );
}

export default Payroll;
