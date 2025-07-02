import React, { useState } from 'react';
import useAxiosSecoure from '../../hooks/useAxiosSecoure';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecoure();
    const [selectedRider, setSelectedRider] = useState(null);

    // Fetching pending riders
    const {
        data: riders = [], isLoading, refetch } = useQuery({
            queryKey: ['pendingRiders'],
            queryFn: async () => {
                const res = await axiosSecure.get('/riders/pending');
                return res.data;
            }
        });

    // Approve rider
    const handleApprove = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to approve this rider application?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#16a34a', // green
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, approve it!',
  });

  if (result.isConfirmed) {
    const res = await axiosSecure.patch(`/riders/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire('Approved!', 'Rider has been approved.', 'success');
      refetch();
    }
  }
};

    // Cancel rider
    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this rider deletion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/riders/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Rider has been deleted.', 'success');
                refetch();
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Pending Rider Applications</h2>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Region</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No pending riders found.
                                    </td>
                                </tr>
                            ) : (
                                riders.map((rider, index) => (
                                    <tr key={rider._id}>
                                        <td>{index + 1}</td>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>{rider.phone}</td>
                                        <td>{rider.region}</td>
                                        <td className="flex gap-2">
                                            <button className="btn btn-sm btn-success" onClick={() => handleApprove(rider._id)}>
                                                <FaCheck />
                                            </button>
                                            <button className="btn btn-sm btn-error" onClick={() => handleCancel(rider._id)}>
                                                <FaTimes />
                                            </button>
                                            <button className="btn btn-sm btn-info" onClick={() => setSelectedRider(rider)}>
                                                <FaEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rider Details Modal */}
            {selectedRider && (
                <dialog id="riderModal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">Rider Details</h3>
                        <div className="space-y-1 text-sm">
                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Phone:</b> {selectedRider.phone}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>Bike Brand:</b> {selectedRider.bikeBrand}</p>
                            <p><b>Bike Number:</b> {selectedRider.bikeNumber}</p>
                            <p><b>Region:</b> {selectedRider.region}, {selectedRider.district}, {selectedRider.area}</p>
                            <p><b>Status:</b> {selectedRider.status}</p>
                            <p><b>Submitted:</b> {new Date(selectedRider.created_at).toLocaleString()}</p>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => setSelectedRider(null)}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;
