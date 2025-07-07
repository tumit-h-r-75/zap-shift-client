import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecoure from '../../hooks/useAxiosSecoure';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaEye, FaMoneyCheckAlt, FaTrash } from 'react-icons/fa';

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

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-700">
        <FaBoxOpen className="text-lime-400 text-3xl" />
        My Parcels ({parcels.length})
      </h2>

      {parcels.length === 0 ? (
        <div className="text-center py-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No parcels"
            className="w-28 mx-auto mb-4 opacity-70 animate-bounce"
          />
          <h2 className="text-xl font-semibold text-gray-700">No Parcels Found</h2>
          <p className="text-sm text-gray-500 mt-1">You haven’t created any parcel yet.</p>
          <Link
            to="/pricing"
            className="mt-4 inline-block bg-lime-400 hover:bg-lime-500 text-white font-medium py-2 px-4 rounded transition"
          >
            Create Now
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="table w-full">
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
                  <td className="flex gap-2 items-center">
                    <Link
                      to={`/parcel-details/${parcel._id}`}
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      title="View"
                    >
                      <FaEye />
                    </Link>

                    {parcel.Payment_status !== "paid" && (
                      <button
                        onClick={() => handlePay(parcel._id)}
                        className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        title="Pay Now"
                      >
                        <FaMoneyCheckAlt />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
