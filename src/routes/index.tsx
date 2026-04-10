import { createBrowserRouter } from "react-router";

import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import SignupPage from "@/pages/Signup";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignupPage /> }
    ]
  }
]);
