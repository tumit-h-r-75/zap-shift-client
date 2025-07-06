import { useState } from 'react';
import useAxiosSecoure from '../../../hooks/useAxiosSecoure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  FaUserShield,
  FaUserSlash,
  FaSearch,
  FaUserCheck,
  FaUser
} from 'react-icons/fa';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecoure();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  // 🔍 Search user by email
  const handleSearch = async () => {
    if (!email) return;

    try {
      const res = await axiosSecure.get(`/user/search?email=${email}`);
      setUser(res.data);
    } catch (err) {
      console.error('User not found', err);
      setUser(null);
    }
  };

  // 🔁 Role update mutation
  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async ({ email, role }) => {
      const res = await axiosSecure.patch('/user/update-role', { email, role });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Role updated successfully!', 'success');
      setUser(null);
      setEmail('');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update role!', 'error');
    }
  });

  // 🛡️ Confirm Role Change
  const handleChangeRole = (newRole) => {
    if (!user?.email) return;

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole({ email: user.email, role: newRole });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-lime-300">
      <h2 className="text-2xl font-bold mb-6 text-lime-600 flex items-center gap-2">
        <FaUserCheck /> Make Admin Panel
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter user email"
          className="input input-bordered border-lime-400 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn bg-lime-500 hover:bg-lime-600 text-white flex items-center gap-2"
        >
          <FaSearch /> Search
        </button>
      </div>

      {user && (
        <div className="overflow-x-auto">
          <table className="table border rounded-lg">
            <thead className="bg-lime-100 text-lime-700">
              <tr>
                <th>Email</th>
                <th>created At</th>
                <th>Current Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td>{user.email}</td>
                <td>{user.createdAt?.slice(0, 10) }</td>
                <td>
                  <span
                    className={`badge px-3 py-1 font-semibold flex items-center gap-1 ${
                      user.role === 'admin'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.role === 'admin' ? <FaUserShield /> : <FaUser />} {user.role}
                  </span>
                </td>
                <td className="flex gap-2">
                  {user.role !== 'admin' && (
                    <button
                      className="btn btn-success btn-sm flex items-center gap-2"
                      onClick={() => handleChangeRole('admin')}
                      disabled={isPending}
                    >
                      <FaUserShield />
                      {isPending ? 'Promoting...' : 'Make Admin'}
                    </button>
                  )}
                  {user.role === 'admin' && (
                    <button
                      className="btn btn-warning btn-sm flex items-center gap-2"
                      onClick={() => handleChangeRole('user')}
                      disabled={isPending}
                    >
                      <FaUserSlash />
                      {isPending ? 'Demoting...' : 'Remove Admin'}
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
