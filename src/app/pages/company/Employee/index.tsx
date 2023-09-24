import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Spinner,
  Badge,
} from "@material-tailwind/react";
import { Modal, HeaderBack, NoData } from "@/app/components";
import { snackBar } from "@/utils/snackbar";
import {
  ArrowLeftIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import {
  deleteDataEmployee,
  postDataEmployee,
  updateDataEmployee,
  getDataEmployeePagination,
  getDataSubscribe,
  exportDataEmployee,
  getDataEmployee,
} from "@/app/services/company";
import { EmployeeTable } from "@/app/components";
import Pagination from "@/app/components/molecules/pagination";
import { isEmpty } from "@/utils/locDash";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { GetDataEmployee, GetDataEmployees, GetDataPositionResponse, GetDataSubscribe, GetDatasSubscribe, GetDepartmentResoponse, GetPositionResponse } from "@/interface/company";
import AddEmployee from "./addEmployee";
import { GetAreaResponse, GetDataAreaResponse } from "@/interface/area";
import { register } from "@/app/services/auth";
import { getDataPosition } from "@/app/services/company/position";
import { getDataArea } from "@/app/services/company/area";

export interface IEmployeeProps {
  open: boolean;
  header: string | JSX.Element | JSX.Element[];
  handleClose(): void;
  body: string | JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[];
  size?: "md" | "sm" | "lg";
}

const mockDataEdit = {
  employeename: 'tasya',
}

export default function Employee() {
  const [addClicked, setAddClicked] = useState<boolean>(false)
  const [editClicked, setEditClicked] = useState<boolean>(false)
  const [dataEmployee, setDataEmployee] = useState<GetDataEmployee[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAll, setSelectedAll] = React.useState<boolean>(false);
  const [listSelected, setListSelected] = React.useState<Array<object>>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [dataEdit, setDataEdit] = useState<GetDataEmployee | null>(null);
  const [query, setQuery] = React.useState<string | null>(null);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [onPage, setOnPage] = React.useState<number>(1);

  const [form, setForm] = useState({
      employeeId: "",
      employeeName: "",
      departmentCode: "",
      departmentName: "",
      positionCode: "",
      positionName: "",
      employeeTypeCode: "",
      employeeTypeName: "",
      pic: "",
      gender: "",
      birthday: new Date(),
      phoneNumber: "",
      address: "",
      postalCode: "",
      national: "",
      religion: "",
      emailAddress: "",
      bankName: "",
      bankAccount: "",
      paymentMethod: "",
      bpjsEmployeeNo: "",
      bpjsEmployeeStartPay: new Date(),
      bpjsEmployeeEndPay: new Date(),
      bpjsHealthCareNo: "",
      bpjsHealthCareStartPay: new Date(),
      bpjsHealthCareEndPay: new Date(),
      npwpNo: "",
      taxStartPay: new Date(),
      taxEndPay: new Date(),
      profilePhoto: "",
      workTypeId: "",
      workTypeName: "",
      areaCode: "",
      areaName: "",
      isResign: false,
      joinDate: new Date(),
      resignDate: new Date(),
      effectiveStart: new Date(),
      effectiveEnd: new Date(),
      accountTypeId: 0,
      createdBy: "tasya"
  })

  const searchData = useRecoilValue(searchAllAtom);

  const getEmployeePagination = async (params) => {
    setIsLoading(true);
    try {
      const response = (await getDataEmployeePagination(params)) as GetDataEmployees;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataEmployee(response.data);
      } else {
        setDataEmployee(null);
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataEmployee) {
        const delaySearch = setTimeout(() => {
          setQuery("");
        }, 1500)
    
        return () => clearTimeout(delaySearch)
      } else setQuery("")
    }
  },[searchData])

  React.useEffect(() => {
    if(query !== null) {
      if(query.length > 0) {
        const params = {
          search: isEmpty(query) ? null : query,
        }
        getEmployeePagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getEmployeePagination(params);
      }
    }
  }, [query]);

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    };

    getEmployeePagination(params);
    setListSelected([]);
    setSelectedAll(false);
  };

  const resetValueForm = () => {
    setForm((data)=>{
      return{
        ...data,
        employeeId: "",
        employeeName: "",
        departmentCode: "",
        departmentName: "",
        positionCode: "",
        positionName: "",
        employeeTypeCode: "",
        employeeTypeName: "",
        pic: "",
        gender: "",
        birthday: new Date(),
        phoneNumber: "",
        address: "",
        postalCode: "",
        national: "",
        religion: "",
        emailAddress: "",
        bankName: "",
        bankAccount: "",
        paymentMethod: "",
        bpjsEmployeeNo: "",
        bpjsEmployeeStartPay: new Date(),
        bpjsEmployeeEndPay: new Date(),
        bpjsHealthCareNo: "",
        bpjsHealthCareStartPay: new Date(),
        bpjsHealthCareEndPay: new Date(),
        npwpNo: "",
        taxStartPay: new Date(),
        taxEndPay: new Date(),
        profilePhoto: "",
        workTypeId: "",
        workTypeName: "",
        areaCode: "",
        areaName: "",
        isResign: false,
        joinDate: new Date(),
        resignDate: new Date(),
        effectiveStart: new Date(),
        effectiveEnd: new Date(),
        accountTypeId: 0,
      }
    })
  };

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await deleteDataEmployee(id);

    if (response) {
      snackBar("success", "Data Employee delete successfully");
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      setIsLoading(false);
      setShowModalDelete(false)
      getEmployeePagination(params)
    } else {
      snackBar("error", "Data Employee delete failed");
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      setIsLoading(false);
      setShowModalDelete(false)
      getEmployeePagination(params)
    }
  };
  const handleEditData = async (data: GetDataEmployee) => {

    setEditClicked(true);
    setAddClicked(false)
    setDataEdit(data);
    setForm((prevValue)=>{
      return{
        ...prevValue,
        employeeId : data.employeeId,
        employeeName : data.employeeName,
        departmentCode : data.departmentCode,
        departmentName : data.departmentName,
        positionCode : data.positionCode,
        positionName : data.positionName,
        employeeTypeCode : data.employeeTypeCode,
        employeeTypeName : data.employeeTypeName,
        pic : data.pic,
        gender : data.gender,
        birthday : data.birthday,
        phoneNumber : data.phoneNumber,
        address : data.address,
        postalCode : data.postalCode,
        national : data.national,
        religion : data.religion,
        emailAddress : data.emailAddress,
        bankName : data.bankName,
        bankAccount : data.bankAccount,
        paymentMethod : data.paymentMethod,
        bpjsEmployeeNo : data.bpjsEmployeeNo,
        bpjsEmployeeStartPay : data.bpjsEmployeeStartPay,
        bpjsEmployeeEndPay : data.bpjsEmployeeEndPay,
        bpjsHealthCareNo : data.bpjsHealthCareNo,
        bpjsHealthCareStartPay : data.bpjsEmployeeStartPay,
        bpjsHealthCareEndPay : data.bpjsHealthCareEndPay,
        npwpNo : data.npwpNo,
        taxStartPay : data.taxStartPay,
        taxEndPay : data.taxEndPay,
        profilePhoto : data.profilePhoto,
        workTypeId : data.workTypeId,
        workTypeName :data.workTypeName,
        areaCode : data.areaCode,
        areaName : data.areaName,
        isResign : data.isResign,
        joinDate : data.joinDate,
        resignDate : data.resignDate,
        effectiveStart : data.effectiveStart,
        effectiveEnd : data.effectiveEnd,
        accountTypeId : data.accountTypeId
    
      }
    })

    setListSelected([]);
    setSelectedAll(false);
  };

  const onEditData = async () => {
    setIsLoading(true);
    const payload = {
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      departmentCode: form.departmentCode,
      departmentName: form.departmentName,
      positionCode: form.positionCode,
      positionName: form.positionName,
      employeeTypeCode: form.employeeTypeCode,
      employeeTypeName: form.employeeTypeName,
      pic: form.pic,
      gender: form.gender,
      birthday: form.birthday,
      phoneNumber: form.phoneNumber,
      address: form.address,
      postalCode: form.postalCode,
      national: form.national,
      religion: form.religion,
      emailAddress: form.emailAddress,
      bankName: form.bankName,
      bankAccount: form.bankAccount,
      paymentMethod: form.paymentMethod,
      bpjsEmployeeNo: form.bpjsEmployeeNo,
      bpjsEmployeeStartPay: form.bpjsEmployeeStartPay,
      bpjsEmployeeEndPay: form.bpjsEmployeeEndPay,
      bpjsHealthCareNo: form.bpjsHealthCareNo,
      bpjsHealthCareStartPay: form.bpjsEmployeeStartPay,
      bpjsHealthCareEndPay: form.bpjsHealthCareEndPay,
      npwpNo: form.npwpNo,
      taxStartPay: form.taxStartPay,
      taxEndPay: form.taxEndPay,
      profilePhoto: form.profilePhoto,
      workTypeId: form.workTypeId,
      workTypeName: form.workTypeName,
      areaCode: form.areaCode,
      areaName: form.areaName,
      isResign: form.isResign,
      joinDate: form.joinDate,
      resignDate: form.resignDate,
      effectiveStart: form.effectiveStart,
      effectiveEnd: form.effectiveEnd,
      accountTypeId: form.accountTypeId,
      updatedBy: "tapasya",
    };

    const response = await updateDataEmployee(
      dataEdit?.id.toString() || "",
      payload
    );

    if (response && !response.isError) {
      setEditClicked(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      getEmployeePagination(params);
      resetValueForm();
      setDataEdit(null);
      snackBar("success", "Data Employee edited successfully");
    } else {
      setEditClicked(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      getEmployeePagination(params);
      resetValueForm();
      setDataEdit(null);
      setIsLoading(false);
      snackBar("error", "Data Employee edited failed");
    }
  };

  const handleAdd = () => {
    setAddClicked(true);
  }

  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      positionCode: form.positionCode,
      positionName: form.positionName,
      departmentCode: form.departmentCode,
      departmentName: form.departmentName,
      employeeTypeCode: form.employeeTypeCode,
      employeeTypeName: form.employeeTypeName,
      pic: form.pic,
      gender: form.gender,
      birthday: form.birthday,
      phoneNumber: form.phoneNumber,
      address: form.address,
      postalCode: form.postalCode,
      national: form.national,
      religion: form.religion,
      emailAddress: form.emailAddress,
      bankName: form.bankName,
      bankAccount: form.bankAccount,
      paymentMethod: form.paymentMethod,
      bpjsEmployeeNo: form.bpjsEmployeeNo,
      bpjsEmployeeStartPay: form.bpjsEmployeeStartPay,
      bpjsHealthCareNo: form.bpjsHealthCareNo,
      bpjsHealthCareStartPay: form.bpjsEmployeeStartPay,
      npwpNo: form.npwpNo,
      taxStartPay: form.taxStartPay,
      profilePhoto: form.profilePhoto,
      workTypeId: form.workTypeId,
      workTypeName: form.workTypeName,
      areaCode: form.areaCode,
      areaName: form.areaName,
      joinDate: form.joinDate,
      effectiveStart: form.effectiveStart,
      accountTypeId: form.accountTypeId,
      createdBy: "tasya",
    };

    const response = await postDataEmployee(payload);
    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      setIsLoading(false);
      getEmployeePagination(params);
      setAddClicked(false)
      setShowModalRegister(true)
    } else {
      setAddClicked(false)
      setIsLoading(false);
      snackBar("error", "Data Employee save failed");
      resetValueForm();
    }
  };

  const handleRegister = async () => {
    setIsLoading(true)

    const payload = {
      userName: form.employeeId,
      fullname: form.employeeName,
      email: form.emailAddress,
      password: '123456',
      role: form.positionName,
      accountTypeId: form.accountTypeId,
    }
  
  const response = await register(payload)

  if(response && !response.isError){
    snackBar("success", "user registered successfully");
    resetValueForm()
    setIsLoading(false)
    setShowModalRegister(false)
  }else{
    snackBar("error", "user registered failed")
    resetValueForm()
    setIsLoading(false)
    setShowModalRegister(false)
  }
}

  const [dataSubscribe, setDataSubscribe] = useState<GetDataSubscribe[] | null>(null)
  const GetSubscribe = async () => {
    try{
      const response = await getDataSubscribe() as GetDatasSubscribe
      if (response.data.length > 0){
        setDataSubscribe(response.data)
      }else {
        setDataSubscribe(null)
      }
    }catch(e: any){
      console.log(e);
      
    }
  }

  const [dataPosition, setDataPosition] = React.useState<GetDataPositionResponse[] | null>(null);
  const GetPosition = async () => {

    try {
      const response = await getDataPosition() as GetPositionResponse;
      if (response.data.length > 0) {
        setDataPosition(response.data);
      } else {
        setDataPosition(null)
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  const [dataArea, setDataArea] = React.useState<GetDataAreaResponse[] | null>(null);
  const GetDataAreas = async () => {
    try {
      const response = await getDataArea() as GetAreaResponse;
      if (response.data.length > 0) {
        setDataArea(response.data);
      } else {
        setDataArea(null)
      }
    } catch (e: any) {
    }
  }

  const handleSelected = (data: GetDataEmployee) => {

    if(listSelected.includes(data)) {
      const arrayFilter = listSelected.filter(e => e !== data)
      setListSelected(arrayFilter);
      
    } else {  
      setListSelected([...listSelected, data]);
    }
  }

  const handleCheckAll = () => {
    if(selectedAll) {
      setListSelected([]);
      setSelectedAll(false);
    } else {
      setListSelected(dataEmployee || []);
      setSelectedAll(true);
    }
    
  }

  const handleExportData = async () => {
    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataEmployee(listSelected);
      snackBar("success", "Data Employee successfully downloaded");
      setIsLoading(false);
    } else {
      const dataAll = await getDataEmployee() as GetDataEmployees;
      if (dataAll.data) await exportDataEmployee(dataAll?.data);
      snackBar("success", "Data Employee failed to download");
      setIsLoading(false);
    }
    
  }

  React.useEffect(() => {
    GetDataAreas();
    GetPosition();
    GetSubscribe();
  }, []);
  
  return (
    <div className="inset-2 mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 flex flex-row gap-4 p-6"
        >
          {!addClicked && !editClicked && 
            <>
              <HeaderBack />
              <Typography variant="h6" color="white">
                Employee
              </Typography>
            </>
          }
          {addClicked && 
            <>
              <div
                className="w-5 flex items-center cursor-pointer"
                onClick={()=>{
                  setAddClicked(false)
                  resetValueForm();
                }}
                >
                <ArrowLeftIcon />
              </div>
              <Typography variant="h6" color="white">
                Add Employee
              </Typography>
            </>
          }

            {editClicked && 
            <>
              <div
                className="w-5 flex items-center cursor-pointer"
                onClick={()=>{
                  setEditClicked(false)
                  resetValueForm();
                }}
                >
                <ArrowLeftIcon />
              </div>
              <Typography variant="h6" color="white">
                Edit Employee
              </Typography>
            </>
            }
        </CardHeader>

        {!addClicked && !editClicked && 
        <div className='flex flex-row gap-1'>
          <Button
              variant="filled"
              color={"blue"}
              className={"px ml-4 mb-4 flex w-20 justify-center p-2"}
              onClick={handleAdd}            >
            <PlusIcon strokeWidth={4} className="mr-1 mt-[1px] h-4 w-4" />
            <Typography
              variant="small"
              className="font-bold uppercase text-white "
              >
              {"Add"}
            </Typography>
          </Button>
          {dataEmployee && (
          <Badge invisible={listSelected.length === 0}  content={listSelected.length}>
            <Button
                  variant="filled"
                  color={'blue'}
                  className={`p-2 ${listSelected.length > 0 ? 'w-30' : 'w-34 '} ml-4 flex mb-4 justify-center`}
                  onClick={handleExportData}            >
              <ArrowUpTrayIcon strokeWidth={5} className="h-4 w-4 mr-2 mt-[1px]" />
              <Typography
                  variant="small"
                  className="font-bold uppercase text-white "
                >
                  {`${listSelected.length > 0 ? 'Export' : 'Export All'}`}
                </Typography>
            </Button>
          </Badge>
        )} 
        </div>
        }
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-5">
          {!addClicked && !editClicked && 
          <EmployeeTable
            isLoading={isLoading}
            getDataEmployee={dataEmployee}
            selectedAll={selectedAll}
            listSelected={listSelected}
            handleDelete={handleClickDelete}
            handleEdit={handleEditData}
            handleCheckAll={handleCheckAll}
            handleSelected={handleSelected}
          />
          }
          {addClicked && <AddEmployee form={form} setForm={setForm} addClicked={addClicked} handleSave={handleSave} isLoading={isLoading} dataArea={dataArea} dataPosition={dataPosition} dataSubscribe={dataSubscribe} />}
          {editClicked && <AddEmployee form={form} setForm={setForm} isLoading={isLoading} onEdit={onEditData} dataArea={dataArea} dataPosition={dataPosition} dataSubscribe={dataSubscribe} />}

          {!addClicked && !editClicked && dataEmployee  && totalPage > 1 ? (
            <Pagination
              onChange={handleChangePage}
              total={totalPage}
              current={currentPage}
            />
          ) : !isLoading && !dataEmployee && !addClicked && !editClicked ? (
            <NoData />
          ) : null}
        </CardBody>
      </Card>

      <Modal
        open={showModalDelete}
        header={"Delete Data Employee"}
        handleClose={() => setShowModalDelete(false)}
        body={<></>}
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"red"}
              disabled={isLoading}
              className={"ml-4 mb-4 flex w-32 flex-row justify-center p-2"}
              onClick={() => handleDelete(idDelete)}            >
              {isLoading ? (
                <>
                  <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                  <Typography
                    variant="small"
                    className="text-center text-xs lg:text-sm font-bold uppercase text-white"
                  >
                    {"Loading"}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="small"
                  className="text-center text-xs lg:text-sm font-bold uppercase text-white"
                >
                  {"Delete"}
                </Typography>
              )}
            </Button>
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 w-28 content-center p-2	"}
              onClick={() => setShowModalDelete(false)}            >
              <Typography
                variant="small"
                className="text-center text-xs lg:text-sm font-bold uppercase text-white"
              >
                {"Cancel"}
              </Typography>
            </Button>
          </div>
        }
        size="sm"
      />

      <Modal
        open={showModalRegister}
        header={"Would you like to regist this employee?"}
        handleClose={() => setShowModalRegister(false)}
        body={<></>}
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"green"}
              disabled={isLoading}
              className={"ml-4 mb-4 flex w-32 flex-row justify-center p-2"}
              onClick={() => handleRegister()}            >
              {isLoading ? (
                <>
                  <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                  <Typography
                    variant="small"
                    className="text-center text-xs lg:text-sm font-bold uppercase text-white"
                  >
                    {"Loading"}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="small"
                  className="text-center items-center text-xs lg:text-sm font-bold uppercase text-white"
                >
                  {"Yes"}
                </Typography>
              )}
            </Button>
            <Button
              variant="filled"
              color={"red"}
              className={"ml-4 mb-4 w-28 content-center p-2	"}
              onClick={() => {
                setShowModalRegister(false);
                resetValueForm();
              } } 
                        >
              <Typography
                variant="small"
                className="text-center font-bold text-xs lg:text-sm uppercase text-white"
              >
                {"No"}
              </Typography>
            </Button>
          </div>
        }
        size="sm"
      />
    </div>
  );
};
