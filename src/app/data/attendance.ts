import { formattedDate, formattedTime } from "@/app/configs";

export const dataTable = ["Name", "Date", "Clock In", "Clock Out", "Address", "Type Device", "Department", "Shift", "Photo"];
export const content = [
    {
      name: "Anas Markopolo",
      date: formattedDate ,
      clockin: "8:45",
      late: true,
      clockout: "17:5",
      address:"Jl. Perumnas Nusa Bali 2, jakarta barat.",
      typeDevice: "Apps",
      department: "Sales",
      shift: "normal",
      photo: "/img/team-4.jpeg",
    },
    {
      name: "Beny Mangkualam",
      date: formattedDate ,
      clockin: "8:56",
      late: true,
      clockout: "17:1",
      address:"Jl. Samosa indah, pakuan jakarta timur.",
      typeDevice: "Devices",
      department: "Marketing",
      shift: "normal",
      photo: "/img/team-2.jpeg",
    },
    {
      name: "Danar Marhadian",
      date: formattedDate ,
      clockin: "7:55",
      late: false,
      clockout: "17:3",
      address:"Jl. Sumur dalam, kelapa gading jakarta utara.",
      typeDevice: "Apps",
      department: "IT Developer",
      shift: "normal",
      photo: "/img/team-3.jpeg",
    },
]
