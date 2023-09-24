import { isEmpty } from "@/utils/locDash";

export function downloadFile (response: any) {
    const url = window.URL.createObjectURL(new Blob([response?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
}

export function toRupiah(value: string) {
    return  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export const colorName = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
];

export const colorNumber = [
    500,
    600,
    700,
    800,
    900,
    950,
]

export const getRandomVal = (array) => {
    return array[(Math.random() * array.length) | 0];
}

export const getRandomNumber = (limit: number) => {
    return Math.floor(Math.random() * limit);
};

export const getBackgroundColor = () => {
    const h = getRandomNumber(360);
    const randomColor = `hsl(${h}deg, 50%, 50%)`;
    return randomColor;
};

export const getInitialLetter = (string: String) => {
    const defaultInitial = 'SU';

    if (string === undefined || string === null || isEmpty(string)) {
        return defaultInitial
    }

    if (string && typeof string === 'string') {
        const arrLetter = string.split(' ');
        if (arrLetter.length === 1) {
            return arrLetter[0].substring(0, 1);
        } else if (arrLetter.length > 1) {
            return arrLetter[0].substring(0, 1) + arrLetter[1].substring(0, 1);
        }
    } else {
        return defaultInitial
    }
}

export const addDotSeparator = (num: { toString: () => string; }) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const removeNonNumeric = (num: { toString: () => string; }) => num.toString().replace(/[^0-9]/g, "");