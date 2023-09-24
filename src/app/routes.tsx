import { ReactElement } from "react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  UsersIcon,
  CurrencyDollarIcon,
  FingerPrintIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import { Home } from "@/app/pages/dashboard";
import { SignIn, SignUp } from "@/app/pages/auth";
import {
  Approval,
  Attendance,
  Company,
  Device,
  Export,
  Import,
  Payroll,
  Schedule,
} from "@/app/pages";
import Department from "./pages/company/Department";
import Leave from "./pages/company/Leave";
import Workshop from "@/app/pages/company/Workshop";
import Employee from "@/app/pages/company/Employee";
import Workflow from "@/app/pages/workflow";

// Page approval
import Area from "@/app/pages/company/Area";
import Position from "@/app/pages/company/Position";
import Overtime from "./pages/approval/Overtime";
import Shift from "./pages/approval/Shift";
import Onleave from "@/app/pages/approval/Onleave";
import WorkshopApproval from "@/app/pages/approval/Workshop";
import AddEmployee from "./pages/company/Employee/addEmployee";

// Page Workflow
import OnleaveWorkflow from "@/app/pages/workflow/Onleave";

interface RouteConfig {
  icon: ReactElement;
  name: string;
  path: string;
  element: ReactElement;
  showSidebar?: boolean;
  image?: string;
}

interface LayoutConfig {
  layout: string;
  pages: RouteConfig[];
  title?: string;
}

const icon = {
  className: "w-5 h-5 text-inherit",
};

const newIcon = {
  width: "40px",
  style: { filter: `brightness(0) saturate(100%) invert(100%) sepia(10%) saturate(34%) hue-rotate(282deg) brightness(98%) contrast(107%)` }
}

export const routesAuth: LayoutConfig[] = [
  {
    title: 'SignIn',
    layout: 'signin',
    pages: [
      {
        icon: <HomeIcon {...icon}/>,
        name: 'SignIn',
        path: '/s',
        element: <SignIn/>
      }
    ]
  },
  {
    title: 'SignUp',
    layout: 'signup',
    pages: [
      {
        icon: <HomeIcon {...icon}/>,
        name: 'SignUp',
        path: '/',
        element: <SignUp/>
      }
    ]
  }
]

export const routes: LayoutConfig[] = [
  {
    title: "MENU UTAMA",
    layout: "dashboard",
    pages: [
      {
        icon: <img src={'/img/icon/dashboard.svg'} {...newIcon} />,
        name: "Dashboard",
        path: "",
        element: <Home />,
        showSidebar: true,
      },
    ],
  },
  {
    layout: "company",
    pages: [
      {
        icon: <img src={'/img/icon/company.svg'} {...newIcon} />,
        name: "Company Data",
        path: "",
        element: <Company />,
        showSidebar: true,
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Area",
        path: "/area",
        element: <Area />,
        showSidebar: false,
        image: 'company-area'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Department",
        path: "/department",
        element: <Department />,
        showSidebar: false,
        image: 'company-department'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Position",
        path: "/position",
        element: <Position />,
        showSidebar: false,
        image: 'company-position'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Leave Type",
        path: "/leave",
        element: <Leave />,
        showSidebar: false,
        image: 'company-leave'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Workshop Type",
        path: "/workshop",
        element: <Workshop />,
        showSidebar: false,
        image: 'company-workshop'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Employee",
        path: "/employee",
        element: <Employee />,
        showSidebar: false,
        image: 'company-employee'
      },
    ],
  },
  {
    layout: "approval",
    pages: [
      {
        icon: <img src={'/img/icon/approval.svg'} {...newIcon} />,
        name: "Approval",
        path: "",
        element: <Approval />,
        showSidebar: true,
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Overtime",
        path: "/overtime",
        element: <Overtime />,
        showSidebar: false,
        image: 'schedule-overtime'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Shift",
        path: "/shift",
        element: <Shift />,
        showSidebar: false,
        image: 'schedule-shift'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "On Leave",
        path: "/onleave",
        element: <Onleave />,
        showSidebar: false,
        image: 'schedule-onleave'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Workshop",
        path: "/workshop-approval",
        element: <WorkshopApproval />,
        showSidebar: false,
        image: 'schedule-workshop'
      },
    ],
  },
  {
    layout: "schedule",
    pages: [
      {
        icon: <img src={'/img/icon/schedule.svg'} {...newIcon} />,
        name: "Schedule",
        path: "",
        element: <Schedule />,
        showSidebar: true,
      }
    ],
  },
  {
    layout: "attendance",
    pages: [
      {
        icon: <img src={'/img/icon/attendance.svg'} {...newIcon} />,
        name: "Attendance",
        path: "",
        element: <Attendance />,
        showSidebar: true,
      },
    ],
  },
  {
    layout: "payroll",
    pages: [
      {
        icon: <img src={'/img/icon/payroll.svg'} {...newIcon} />,
        name: "Payroll",
        path: "",
        element: <Payroll />,
        showSidebar: true,
      },
    ],
  },
  {
    layout: "device",
    pages: [
      {
        icon: <img src={'/img/icon/device.svg'} {...newIcon} />,
        name: "Device",
        path: "",
        element: <Device />,
        showSidebar: true,
      },
    ],
  },
  {
    layout: "import",
    pages: [
      {
        icon: <img src={'/img/icon/import.svg'} {...newIcon} />,
        name: "Import",
        path: "",
        element: <Import />,
        showSidebar: true,
      },
    ],
  },
  {
    layout: "workflow",
    pages: [
      {
        icon: <img src={'/img/icon/workflow.svg'} {...newIcon} />,
        name: "Workflow",
        path: "/workflow",
        element: <Workflow />,
        showSidebar: true,
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Onleave",
        path: "/onleave",
        element: <OnleaveWorkflow />,
        showSidebar: false,
        image: 'company-leave'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Workshop",
        path: "/workshop",
        element: <p>Workshop</p>,
        showSidebar: false,
        image: 'company-workshop'
      },
    ],
  },
];

