import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Signin />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/signup',
        element: <Signup />
    }
])