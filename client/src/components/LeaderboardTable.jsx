// -------------------- PACKAGE IMPORT FILES -------------------- //
import React from 'react';
import { Link } from 'react-router-dom';

const LeaderboardTable = ({ data, isLoading, rank }) => {
    if (isLoading) {
        return <div className="text-center text-slate-500 py-8">Loading Leaderboard...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md mt-4 overflow-hidden">
            <h2 className="text-xl font-bold text-slate-700 p-4 border-b border-slate-200">
                Leaderboard
            </h2>
            {/* Desktop Table - Hidden on small screens */}
            <div className="hidden md:block">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600">Rank</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600">Name</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600">Total Points</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600">History</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {data.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50">
                                <td className="p-4 font-bold text-lg text-indigo-600 w-24 text-center">{user.rank}</td>
                                <td className="p-4 font-medium text-slate-800">{user.fullName}</td>
                                <td className="p-4 text-slate-600">{user.totalPoints}</td>
                                <td className="p-4">
                                    <Link to={`/history/${user._id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List - Hidden on medium screens and up */}
            <div className="md:hidden">
                <ul className="divide-y divide-slate-200">
                    {data?.map((user) => (
                        <li key={user._id} className="p-4">
                            <div className="flex items-center space-x-4">
                                <div className="font-bold text-xl text-indigo-600 w-12 text-center">{user.rank}</div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-800">{user.fullName}</p>
                                    <p className="text-sm text-slate-500">{user.totalPoints} Points</p>
                                </div>
                                <div>
                                    <Link to={`/history/${user._id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                                        View History
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
           
        </div>
    );
};

export default LeaderboardTable;