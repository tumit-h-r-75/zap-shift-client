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
            console.error("User not found", err);
            setUser(null);
        }
    };

    // Role update mutation
    const { mutate: updateRole, isPending } = useMutation({
        mutationFn: async ({ email, role }) => {
            const res = await axiosSecure.patch('/user/update-role', { email, role });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire(' Success', 'Role updated successfully!', 'success');
            setUser(null);
            setEmail('');
            queryClient.invalidateQueries(['users']);
        },
        onError: () => {
            Swal.fire(' Error', 'Failed to update role!', 'error');
        }
    });

    //  Confirm role change
    const handleChangeRole = (newRole) => {
        if (!user?.email) return;

        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to change role to ${newRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                updateRole({ email: user.email, role: newRole });
            }
        });
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaUserCheck className="text-blue-600" /> Make Admin
            </h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search user by email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary flex items-center gap-2">
                    <FaSearch /> Search
                </button>
            </div>

            {user && (
                <div className="bg-gray-100 p-4 rounded shadow space-y-2">
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p className="flex items-center gap-1">
                        <strong>Current Role:</strong>
                        {user.role === 'admin' ? (
                            <span className="text-green-600 font-semibold flex items-center gap-1">
                                <FaUserShield /> Admin
                            </span>
                        ) : (
                            <span className="text-gray-700 font-semibold flex items-center gap-1">
                                <FaUser /> User
                            </span>
                        )}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {user.role !== 'admin' && (
                            <button
                                className="btn btn-success flex items-center gap-2"
                                onClick={() => handleChangeRole('admin')}
                                disabled={isPending}
                            >
                                <FaUserShield />
                                {isPending ? 'Promoting...' : 'Make Admin'}
                            </button>
                        )}
                        {user.role === 'admin' && (
                            <button
                                className="btn btn-warning flex items-center gap-2"
                                onClick={() => handleChangeRole('user')}
                                disabled={isPending}
                            >
                                <FaUserSlash />
                                {isPending ? 'Demoting...' : 'Remove Admin'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;
