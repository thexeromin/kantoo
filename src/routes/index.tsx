import { createBrowserRouter, redirect, Outlet } from "react-router";
import { supabase } from "@/lib/supabase";

import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/pages/Home";
import SignupPage from "@/pages/Signup";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";

const requireAuth = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return redirect("/login");
  return session;
};

const redirectIfLoggedIn = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/dashboard");
  }

  return null;
};

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    loader: redirectIfLoggedIn,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> }
    ]
  },
  {
    element: <Outlet />,
    loader: requireAuth,
    children: [{ path: "/dashboard", element: <DashboardPage /> }]
  }
]);
