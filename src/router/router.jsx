import { createBrowserRouter, } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Coverage from "../pages/Coverage/Coverage";
import AddParcel from "../pages/AddParcel/AddParcel";
import PrivateRoute from "../context/PrivateRoute";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: Home },
            { path: '/coverage', Component: Coverage },
            {
                path: '/pricing',
                element:<PrivateRoute>
                    <AddParcel></AddParcel>
                </PrivateRoute>,
            },

        ]
    },
    {
        path: "/auth",
        Component: AuthLayouts,
        children: [
            { path: "/auth/login", Component: Login },
            { path: "/auth/register", Component: Register }
        ]
    }
]);