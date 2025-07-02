import React from 'react';
import useAxiosSecoure from '../../hooks/useAxiosSecoure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader'; // Optional: use if you want to show a loader

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecoure();

  // ✅ Fetching active riders using TanStack Query
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    }
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

      {isLoading ? (
        <Loader /> // Optional loading spinner
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
              </tr>
            </thead>
            <tbody>
              {riders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
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
