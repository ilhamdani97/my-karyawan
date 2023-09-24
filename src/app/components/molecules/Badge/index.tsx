import * as React from 'react';

export interface IBadgeProps {
    children: React.ReactNode;
    bgColor: string;
    onClick: () => void;
    content: string;
    colorNumber?: string;
}

export default function Badge ({ children, bgColor = 'red', colorNumber = '500', onClick, content }: IBadgeProps) {
  return (
    <div className="relative">
        <div className="">
            {children}
        </div>
        <div
            onClick={onClick}
            className={`bg-${bgColor}-${colorNumber} rounded-full border-2 border-white w-6 h-6 text-white flex justify-center items-center font-bold text-xs absolute -top-3 -right-3`}
        >
            {content}
        </div>
    </div>
  );
}
