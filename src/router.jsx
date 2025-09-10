import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import Protected from "./components/Protected";

import Dashboard from "./routes/Dashboard";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />
    },
    {
        path: '/dashboard',
        element: (
            <Protected>
                <Dashboard />
            </Protected>
        )
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/signin',
        element: <Signin />
    }
])