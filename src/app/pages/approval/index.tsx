import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataDummyRecoils } from "@/store/Atendance/atom";
import CardMenu from "@/app/components/molecules/cards/CardMenu";
import {routes} from "@/app/routes";

export function Approval() {
  // use Recoil
  const data = useRecoilValue(dataDummyRecoils);

  return (
    <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {routes.map(
            ({ layout, pages }) =>
                layout === "approval" &&
                pages.map(({ name, path, image }, index) => (
                    <>
                        {index > 0 && (
                            <CardMenu 
                                key={index}
                                navigate={`/${layout}${path}`}
                                title={name}
                                image={image || ''}
                            />
                        )}
                    </>
                    
                ))
            )}
            
        </div>
    </div>
  );
}

export default Approval;

