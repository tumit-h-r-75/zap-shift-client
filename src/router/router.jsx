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
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Tracking from "../pages/Dashboard/Tracking/Tracking";
import BeARider from "../pages/BeARider/BeaRider";
import ActiveRiders from "../pages/BeARider/ActiveRiders";
import PendingRiders from "../pages/BeARider/PendingRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbiden from "../pages/Forbidden/Forbiden";
import AdminRoute from "../context/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";


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
            {
                path: '/forbidden',
                Component: Forbiden
            },
            {
                path: '/be-a-rider',
                element: <PrivateRoute>
                    <BeARider></BeARider>
                </PrivateRoute>
            }

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
            { path: 'payment/:id', Component: Payment },
            { path: 'paymentHistory', Component: PaymentHistory },
            { path: 'tracking', Component: Tracking },
            { path: 'assign-rider', element:<AdminRoute><AssignRider></AssignRider></AdminRoute> },
            { path: 'activeRiders', element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute> },
            { path: 'pendingRiders', element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute> },
            { path: 'makeAdmin', element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute> },

        ]
    }
]);