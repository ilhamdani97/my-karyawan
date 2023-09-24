import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/app/context";
import { Snackbar } from "@/app/components";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import "../../public/css/tailwind.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <CookiesProvider>
            <RecoilRoot>
              <App />
              <Snackbar />
            </RecoilRoot>
          </CookiesProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>
)
