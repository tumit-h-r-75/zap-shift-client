import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecoure from '../../hooks/useAxiosSecoure';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecoure = useAxiosSecoure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecoure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    // 🗑️ Delete handler with SweetAlert2
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecoure.delete(`/parcels/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
                    refetch();
                } else {
                    Swal.fire('Failed', 'Parcel not found or could not be deleted.', 'error');
                }
            }
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // for payment 
    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
                My Parcels ({parcels.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-blue-100 text-left">
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Created</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover:bg-gray-50">
                                <td>{index + 1}</td>
                                <td>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${parcel.type === "Document"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-800"}`}>
                                        {parcel.type}
                                    </span>
                                </td>
                                <td>{formatDate(parcel.creation_date)}</td>
                                <td>৳{parcel.cost}</td>
                                <td>
                                    <span className={`px-2 py-1 text-sm font-medium rounded ${parcel.Payment_status === "paid"
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"}`}>
                                        {parcel.Payment_status}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <Link
                                        to={`/parcel-details/${parcel._id}`}
                                        className="px-3 py-1 bg-blue-600 text-white rounded"
                                    >
                                        View
                                    </Link>

                                    {
                                        parcel.Payment_status !== "paid" && (
                                            <button
                                                className="px-3 py-1 bg-purple-600 text-white rounded"
                                                onClick={() => handlePay(parcel._id)}
                                            >
                                                Pay
                                            </button>
                                        )
                                    }

                                    <button
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                        onClick={() => handleDelete(parcel._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
