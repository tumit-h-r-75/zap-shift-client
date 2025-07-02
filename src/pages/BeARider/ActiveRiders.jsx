import React, { useState } from 'react';
import useAxiosSecoure from '../../hooks/useAxiosSecoure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../components/Loader';
import Swal from 'sweetalert2';
import { FaBan, FaUserCheck, FaSearch } from 'react-icons/fa';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecoure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  // Load Active Riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    }
  });

  // Deactivate Mutation
  const deactivateMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deactivated!', 'Rider moved to pending list.', 'success');
      queryClient.invalidateQueries(['activeRiders']);
      queryClient.invalidateQueries(['pendingRiders']);
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

  // Filtered Riders by search
  const filteredRiders = riders.filter(rider =>
    rider.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

      {/* Search Bar */}
      <div className="mb-4 flex items-center max-w-md mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200">
          <table className="table w-full">
            <thead className="bg-blue-50">
              <tr>
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
              {filteredRiders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No matching rider found.
                  </td>
                </tr>
              ) : (
                filteredRiders.map((rider, index) => (
                  <tr key={rider._id} className="hover:bg-blue-50 transition-all duration-200">
                    <td>{index + 1}</td>
                    <td className="font-semibold text-gray-800">{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.phone}</td>
                    <td>{rider.region}</td>
                    <td>{rider.bikeBrand} ({rider.bikeNumber})</td>
                    <td>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        <FaUserCheck className="text-green-500" /> Active
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
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
