import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Auth, Template } from "@/app/layouts";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { SignIn, SignUp } from "./pages/auth";
import { FirstRoute } from "./routes/FirstRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { routes } from "./routes";
import { Payroll } from "@/app/pages";

function App() {
  const pathUrl = window.location.pathname.split("/");
  const pathOrigin = routes.filter((data) => data.layout.includes(pathUrl[1]));
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <FirstRoute>
            <Navigate to="/dashboard" />
          </FirstRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/404" element={<NotFoundPage />} />
      {/* <Route
          path="/:layout/*"
          element={
            <Route>
              <Template />
            </Route>
          }
        /> */}
      {/* <Route path="/payrollwafa" element={<Payroll />} /> */}
      {pathOrigin.length > 0 ? (
        <Route
          path="/:layout/*"
          element={
            <ProtectedRoute>
              <Template />
            </ProtectedRoute>
            // <Route>
            //   <Template />
            // </Route>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/404" replace />} />
      )}
    </Routes>
  );
}

export default App;
