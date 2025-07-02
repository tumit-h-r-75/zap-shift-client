import React from 'react';
import useAxiosSecoure from '../../hooks/useAxiosSecoure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';
import { FaBan, FaUserCheck } from 'react-icons/fa';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecoure();
  const queryClient = useQueryClient();

  //  Load Active Riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    }
  });

  // Deactivate Rider (status → 'pending')
  const deactivateMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deactivated!', 'Rider moved to pending list.', 'success');
      queryClient.invalidateQueries(['activeRiders']);
      queryClient.invalidateQueries(['pendingRiders']); // if you're showing pending list too
    }
  });

  const handleDeactivate = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this rider?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
      confirmButtonColor: '#f59e0b',
    }).then(result => {
      if (result.isConfirmed) {
        deactivateMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

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
                <th>Bike</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No active riders found.
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
                    <td>{rider.bikeBrand} ({rider.bikeNumber})</td>

                    {/* Status Badge */}
                    <td>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        <FaUserCheck className="text-green-500" />
                        Active
                      </span>
                    </td>

                    {/*  Only Deactivate Button */}
                    <td>
                      <button
                        className="btn btn-sm btn-warning tooltip"
                        data-tip="Deactivate"
                        onClick={() => handleDeactivate(rider._id)}
                      >
                        <FaBan className="mr-1" /> Deactivate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
