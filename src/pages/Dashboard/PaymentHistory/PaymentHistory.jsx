import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecoure from '../../../hooks/useAxiosSecoure';
import Loader from '../../../components/Loader';
import { FaMoneyCheckAlt, FaCalendarAlt, FaHashtag, FaEnvelope, FaBoxOpen } from 'react-icons/fa';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecoure = useAxiosSecoure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecoure.get(`/my-payments/${user?.email}`);
            return res.data;
        }
    });

    if (isPending) return <Loader />;

    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    <FaMoneyCheckAlt className="inline mr-2 text-lime-500" />
                    Payment History
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Payments: {payments.length}
                </p>
            </div>

            {/* Table */}
            {payments.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md">
                    No payments found.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-lime-100 dark:bg-lime-900">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase">#</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase">
                                    <FaHashtag className="inline mr-1" />Transaction ID
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase">
                                    <FaMoneyCheckAlt className="inline mr-1" />Amount
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase">
                                    <FaEnvelope className="inline mr-1" />User Email
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase">
                                    <FaBoxOpen className="inline mr-1" />Parcel ID
                                </th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase">
                                    <FaCalendarAlt className="inline mr-1" />Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{index + 1}</td>
                                    <td className="py-3 px-4 text-blue-600 font-mono break-all text-sm">{payment.transactionId}</td>
                                    <td className="py-3 px-4 text-green-600 font-semibold text-sm">${payment.amount}</td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200 text-sm">{payment.email}</td>
                                    <td className="py-3 px-4 text-purple-700 font-mono break-all text-sm">{payment.parcelId}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                                        {new Date(payment.date).toLocaleString()}
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

export default PaymentHistory;
