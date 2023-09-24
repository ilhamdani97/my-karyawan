import React from "react";
import { useRecoilValue } from "recoil";
import { dataDummyRecoils } from "@/store/Atendance/atom";
import { routes } from "@/app/routes";
import { CardMenu } from "@/app/components";

export function Company() {
  // use Recoil
  const data = useRecoilValue(dataDummyRecoils);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {routes.map(
          ({ layout, pages }) =>
            layout === "company" &&
            pages.map(({ name, path, image }, index) => (
              <>
                {index > 0 && (
                  <CardMenu
                    key={index}
                    navigate={`/${layout}${path}`}
                    title={name}
                    image={image || ""}
                  />
                )}
              </>
            ))
        )}
      </div>
    </div>
  );
}

export default Company;
