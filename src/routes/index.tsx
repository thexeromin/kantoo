import { createBrowserRouter, redirect, Outlet } from "react-router";
import { supabase } from "@/lib/supabase";

import { PrivateLayout, PublicLayout } from "@/layouts";
import HomePage from "@/pages/Home";
import SignupPage from "@/pages/Signup";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import KanbanPage from "@/pages/Kanban";

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
    element: <PrivateLayout />,
    loader: requireAuth,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/board/:boardId", element: <KanbanPage /> }
    ]
  }
]);
