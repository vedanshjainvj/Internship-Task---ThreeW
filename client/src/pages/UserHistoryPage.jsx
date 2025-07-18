// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

// --------------- Importing Other Files --------------- //
import Pagination from '../components/Pagination';
import { getUserHistory } from '../api/apiClient';

const UserHistoryPage = () => {
    const { userId } = useParams();
    const [history, setHistory] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = useCallback(async (page = 1) => {
        setIsLoading(true);
        const response = await getUserHistory(userId, { pageNo: page, limit: 10 });
        if (response.data) {
            setHistory(response.data.userDetails.history);
            setUserDetails(response.data.userDetails.user);
            setPagination({
                currentPage: response.data.pagination.page,
                totalPages: response.data.pagination.totalPages
            });
        } else {
            setHistory([]);
            setPagination({ currentPage: 1, totalPages: 1 });
        }
        setIsLoading(false);
    }, [userId]);

    useEffect(() => {
        fetchHistory(1);
    }, [fetchHistory]);


    return (
        <div className="space-y-6">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">&larr; Back to Leaderboard</Link>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className='flex flex-row items-center justify-between p-4'>
                    <h2 className="text-xl font-bold text-slate-700 border-b border-slate-200">
                        History for {userDetails.fullName || 'User'}
                    </h2>
                    {isLoading && <p className="text-center text-slate-500 py-8">Loading history...</p>}
                    {!isLoading && history.length === 0 && <p className="text-center text-slate-500 py-8">No history found for this user.</p>}
                    <span>
                        <span className="font-bold text-lg text-slate-800">Total Points: </span>
                        <span className="text-emerald-600 font-semibold">{userDetails.totalPoints || 0}</span>
                    </span>
                </div>
                <div className="hidden md:block">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Points Awarded</th>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Date Claimed</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {history.map(item => (
                                <tr key={item._id} className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-emerald-600">
                                        +{item.pointIncreased} <span className="text-slate-500 font-normal">→ {item.totalPoints}</span>
                                    </td>
                                    <td className="p-4 text-slate-600">
                                        {new Date(item.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="md:hidden">
                    <ul className="divide-y divide-slate-200">
                        {history.map(item => (
                            <li key={item._id} className="p-4 flex justify-between items-center">
                                <div>
                                    <span className="font-bold text-emerald-600 text-lg">
                                        +{item.pointIncreased}
                                    </span>
                                    <span className="text-slate-500 ml-2">→ {item.totalPoints}</span>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={fetchHistory}
            />
        </div>
    );
};

export default UserHistoryPage;
