// src/pages/Dashboard/MakeAdmin.jsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaSearch, FaUserShield, FaUserSlash } from 'react-icons/fa';
import useAxiosSecoure from '../../../hooks/useAxiosSecoure';

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecoure();
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    // 🔍 Search user by email
    const handleSearch = () => {
        if (!email.trim()) {
            toast.error('Please enter an email');
            return;
        }

        axiosSecure.get(`/user/search?email=${email}`)
            .then(res => {
                if (res.data) {
                    setUser(res.data);
                    toast.success('User found');
                } else {
                    setUser(null);
                    toast.error('User not found');
                }
            });
    };

    // ✅ Make admin
    const handleMakeAdmin = () => {
        axiosSecure.patch('/user/make-admin', { email: user.email })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.email} is now an Admin`);
                    setUser({ ...user, role: 'admin' });
                }
            });
    };

    // ❌ Remove admin
    const handleRemoveAdmin = () => {
        axiosSecure.patch('/user/remove-admin', { email: user.email })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.email} is no longer an Admin`);
                    setUser({ ...user, role: 'user' });
                }
            });
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🔍 Search User to Manage Admin Role</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="input input-bordered w-full"
                />
                <button onClick={handleSearch} className="btn btn-primary flex items-center gap-2">
                    <FaSearch /> Search
                </button>
            </div>

            {user && (
                <div className="bg-white p-4 shadow rounded-lg border space-y-2">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role || 'user'}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                    {user.role !== 'admin' ? (
                        <button
                            onClick={handleMakeAdmin}
                            className="btn btn-success mt-2 flex items-center gap-2"
                        >
                            <FaUserShield /> Make Admin
                        </button>
                    ) : (
                        <button
                            onClick={handleRemoveAdmin}
                            className="btn btn-warning mt-2 flex items-center gap-2"
                        >
                            <FaUserSlash /> Remove Admin
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;
