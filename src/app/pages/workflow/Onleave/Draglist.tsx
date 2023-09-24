import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import {
    Button,
    ButtonGroup,
    Typography,
  } from "@material-tailwind/react";
import { InboxArrowDownIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { colorName, getRandomVal } from "@/utils/general";
import { snackBar } from "@/utils/snackbar";
import { getDataDepartment } from "@/app/services/company/department";
import { getPositionByDepartment } from "@/app/services/workflow";
import Shimmer from "@/app/pages/workflow/Onleave/Shimmer";

// fake data generator
const getItems = (count: number, prefix: string) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `position-${randomId}`,
      prefix,
      content: `position ${randomId}`,
      bgColor: getRandomVal(colorName),
    };
  });

const removeFromList = (list: Iterable<object> | ArrayLike<object>, index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: Iterable<object> | ArrayLike<object>, index: number, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["position", "requestor", "approval"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(3, listKey) }),
    {}
  );

const mockPosLists = {
  "position": [
      {
          "id": "position-897",
          "prefix": "position",
          "content": "position 897",
          "bgColor": "blue"
      },
      {
          "id": "position-117",
          "prefix": "position",
          "content": "position 117",
          "bgColor": "purple"
      },
      {
          "id": "position-155",
          "prefix": "position",
          "content": "position 155",
          "bgColor": "orange"
      }
  ],
  "requestor": [],
  "approval": [
      // {
      //     "id": "position-912",
      //     "prefix": "approval",
      //     "content": "position 912",
      //     "bgColor": "pink"
      // },
      // {
      //     "id": "position-984",
      //     "prefix": "approval",
      //     "content": "position 984",
      //     "bgColor": "lime"
      // },
      // {
      //     "id": "position-724",
      //     "prefix": "approval",
      //     "content": "position 724",
      //     "bgColor": "lime"
      // }
  ]
}

function DragList() {
  const [elements, setElements] = useState({
    position: [],
    requestor: [],
    approval: [],
  });
  const [departmentList, setDepartmentList] = useState<Array<object>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [defaultElements, setDefaultElements] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingChip, setIsLoadingChip] = useState<boolean>(false)

  const onDragEnd = (result) => {

    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  const handleSave = () => {
    const { requestor } = elements;

    if (requestor.length === 0) {
      snackBar('warn', `Requester need to be minimal one person`);
    } else if (requestor.length > 1) {
        snackBar('warn', `Requester can only one person`);
    } else {
        snackBar('success', 'Data workflow saved succesfully');
    }
  }

  const handleReset = () => {
    setElements(defaultElements);
    snackBar('success', 'Data workflow reset succesfully');
  }

  const requestorLength = elements.requestor.length > 1;

  const requestorLengthOne = elements.requestor.length === 1;

  const handleClickDepartment = async (department, index) => {

    setActiveIndex(index);

    setIsLoadingChip(true);
    try {
      const dataPositionByDepartment = await getPositionByDepartment(department.departmentCode);
      const mappedDataPosition = dataPositionByDepartment.data.reduce((acc: { id: any; prefix: string; content: any; bgColor: any; }[], curr: { positionCode: any; positionName: any; }) => {
        acc.push({
          id: curr.positionCode,
          prefix: "position",
          content: curr.positionName,
          bgColor: getRandomVal(colorName)
        })
  
        return acc;
      }, []);

      const initElements = {
        requestor: [],
        approval: [],
        position: mappedDataPosition,
      }
      setDefaultElements(initElements);
      setElements(() => {
        return initElements;
      })
      setIsLoadingChip(false);
    } catch (err) {
      setIsLoadingChip(false)
      snackBar('error', 'Oops, have a trouble');

    }
  }

  const getDepartmentOne = async () => {
    setIsLoading(true);

    try {
      const res = await Promise.all([
        getDataDepartment()
      ])

      const data = res.map((res) => res.data);
      console.log('data gan bro ==>', data);
      const flattedData = data.flat();
      console.log('flattedData gan bro ==>', flattedData);

      setDepartmentList(flattedData);
      handleClickDepartment(flattedData[0], activeIndex);
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      snackBar('error', 'Oops, have a trouble');
    }
  }

  useEffect(() => {
    getDepartmentOne();
  }, []);

  return (
    <>
      {isLoading ? (
        <Shimmer />
      ) : (
        <>
          <div className="flex flex-row justify-center gap-1 overflow-x-scroll w-full">
              <ButtonGroup variant="outlined" color="blue" className="ov">
                {departmentList.map((department, index) => (
                  <Button
                    onClick={() => handleClickDepartment(department, index)}
                    key={`department-${index}`}
                    style={index === activeIndex ? { background: 'rgb(76 175 80)', color: '#fff' } : {}}
                  >
                    {department?.departmentName}
                  </Button>
                ))}

              </ButtonGroup>
          </div>
          <div className="p-4 rounded-lg border-solid border-amber-200 bg-white">
          <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-wrap gap-y-4 justify-between">
              {lists.map((listKey) => (
                  <DraggableElement
                    isLoadingChip={isLoadingChip}
                    isDropDisabled={requestorLengthOne && listKey === 'requestor' ? true : false}
                    titleCard={listKey}
                    elements={elements[listKey]}
                    key={listKey}
                    prefix={listKey}
                    className={requestorLength && listKey === 'requestor' ? "border-2 border-red-500 border-solid" : ""}
                    style={listKey === 'position' ? { flexBasis: '100%', minHeight: '150px' } : { flexBasis: '49%'}}

                  />
              ))}
              </div>
              {requestorLength && (
                <Typography color="red" variant="small" className="mt-2">Requester can only one person</Typography>
              )}
          </DragDropContext>

              <div className="flex flex-row my-6 justify-center mr-4">
                <Button
                    variant="filled"
                    color={'blue'}
                    className={'p-2 w-20 ml-4 flex mb-4' }
                    onClick={handleSave}
                >
                    <InboxArrowDownIcon strokeWidth={4} className="h-5 w-5 mr-2" />
                    <Typography
                        variant="small"
                        className="font-bold uppercase text-white "
                        >
                        {'Save'}
                    </Typography>
                </Button>

                <Button
                    variant="filled"
                    color={'red'}
                    className={'p-2 w-20 ml-4 flex mb-4' }
                    onClick={handleReset}
                >
                    <ArrowPathIcon strokeWidth={4} className="h-5 w-5 mr-2" />
                    <Typography
                        variant="small"
                        className="font-bold uppercase text-white "
                        >
                        {'Reset'}
                    </Typography>
                </Button>
              </div>
          </div>
        </>
      )}
    </>
  );
}

export default DragList;
