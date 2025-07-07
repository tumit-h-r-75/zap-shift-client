import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecoure from '../../../hooks/useAxiosSecoure';
import Loader from '../../../components/Loader';

const AssignRider = () => {
    const axiosSecure = useAxiosSecoure();

    const [selectedParcel, setSelectedParcel] = useState(null); // parcel for which modal is open
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRider, setSelectedRider] = useState(null); // rider selected in modal

    // Fetch parcels
    const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
        queryKey: ['parcels', 'assign-list'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/admin?status=not_collected&payment=paid');
            return res.data;
        },
    });

    // Fetch riders filtered by district of selected parcel (lazy fetch — only when modal is open)
    const { data: riders = [], isLoading: ridersLoading } = useQuery({
        queryKey: ['riders', selectedParcel?.receiverDistrict || ''],
        queryFn: async () => {
            if (!selectedParcel) return [];
            const res = await axiosSecure.get(`/riders?district=${encodeURIComponent(selectedParcel.receiverDistrict)}`);
            return res.data;
        },
        enabled: !!selectedParcel,  // only run when selectedParcel is set
    });

    if (parcelsLoading) return <Loader />;

    // Handle Assign Rider button click — open modal and set parcel
    const openAssignModal = (parcel) => {
        setSelectedParcel(parcel);
        setSelectedRider(null); // reset previous selection
        setModalOpen(true);
    };

    // Handle modal close
    const closeModal = () => {
        setModalOpen(false);
        setSelectedParcel(null);
        setSelectedRider(null);
    };

    // Handle rider selection from modal list
    const selectRider = (rider) => {
        setSelectedRider(rider);
    };

    // Handle confirm assign rider to parcel
    const confirmAssignRider = async () => {
        if (!selectedRider || !selectedParcel) return alert('Please select a rider');

        try {
            await axiosSecure.patch(`/parcels/assign-rider`, {
                parcelId: selectedParcel._id,
                riderId: selectedRider._id,
            });

            alert(` Rider ${selectedRider.name} assigned & parcel in-transit`);
            closeModal(); // modal বন্ধ করো
        } catch (error) {
            console.error(error);
            alert(' Failed to assign rider');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold text-lime-600 mb-4">Assign Rider</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-lime-100 text-lime-700">
                        <tr>
                            <th>#</th>
                            <th>Tracking ID</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className="font-medium">{parcel.tracking_id}</td>
                                <td>
                                    <p className="font-semibold">{parcel.senderName}</p>
                                    <p className="text-xs text-gray-500">{parcel.senderContact}</p>
                                    <p className="text-xs text-gray-500">{parcel.senderDistrict}, {parcel.senderArea}</p>
                                </td>
                                <td>
                                    <p className="font-semibold">{parcel.receiverName}</p>
                                    <p className="text-xs text-gray-500">{parcel.receiverContact}</p>
                                    <p className="text-xs text-gray-500">{parcel.receiverDistrict}, {parcel.receiverArea}</p>
                                </td>
                                <td>{parcel.type}</td>
                                <td>{parcel.cost}৳</td>
                                <td>
                                    <span className="badge bg-yellow-100 text-yellow-700">{parcel.delevery_status}</span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => openAssignModal(parcel)}
                                        className="btn btn-sm bg-lime-500 hover:bg-lime-600 text-white"
                                    >
                                        Assign Rider
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Assign Rider for {selectedParcel.tracking_id}</h3>

                        {ridersLoading ? (
                            <Loader />
                        ) : (
                            <>
                                {riders.length === 0 && (
                                    <p className="text-red-500">No riders found in {selectedParcel.receiverDistrict}</p>
                                )}

                                <ul>
                                    {riders.map((rider) => (
                                        <li
                                            key={rider._id}
                                            onClick={() => selectRider(rider)}
                                            className={`p-2 cursor-pointer rounded mb-2 border ${selectedRider?._id === rider._id ? 'bg-lime-200 border-lime-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <p className="font-semibold">{rider.name}</p>
                                            <p className="text-xs">{rider.contact}</p>
                                            <p className="text-xs italic">{rider.district}</p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button onClick={closeModal} className="btn btn-outline">Cancel</button>
                                    <button
                                        onClick={confirmAssignRider}
                                        className="btn bg-lime-500 hover:bg-lime-600 text-white"
                                        disabled={!selectedRider}
                                    >
                                        Confirm Assign
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
