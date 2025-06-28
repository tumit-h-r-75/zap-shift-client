import { createBrowserRouter, } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Coverage from "../pages/Coverage/Coverage";
import AddParcel from "../pages/AddParcel/AddParcel";
import PrivateRoute from "../context/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: Home },
            { path: '/coverage', Component: Coverage },
            {
                path: '/pricing',
                element: <PrivateRoute>
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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            { path: "myParcels", Component: MyParcels },
            {path:'payment/:id',Component:Payment}
        ]
    }
]);