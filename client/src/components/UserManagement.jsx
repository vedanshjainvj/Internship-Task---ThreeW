// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// --------------- Importing Other Files --------------- //
import AddUserForm from './AddUserForm';
import { claimPointsForUser, getAllUsers, getSocket } from '../api/apiClient';

const UserManagement = ({ refreshData }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [isClaiming, setIsClaiming] = useState(false);

    const location = useLocation();
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers();
            setUsers(response.data);
            if (response.data.length > 0) setSelectedUser(response.data[0]._id);
        };

        fetchUsers();

        const socket = getSocket();

        socket.on("usersUpdated", (updatedUsers) => {
            setUsers(updatedUsers);
            setSelectedUser(updatedUsers.length > 0 ? updatedUsers[0]._id : null);
        });

        return () => {
            socket.off("usersUpdated");
        };
    }, [location.pathname]);

    const handleClaimPoints = async () => {
        if (!selectedUser) return;
        setIsClaiming(true);
        const response = await claimPointsForUser(selectedUser);
        if (response.success) {
            alert(`Points claimed successfully for user ${selectedUser}`);
        }
        setIsClaiming(false);
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <AddUserForm refreshData={refreshData} />

                <div className="hidden md:block w-px h-16 bg-slate-200"></div>
                <hr className="md:hidden" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label htmlFor="user-select" className="font-medium text-slate-700">Claim For:</label>
                    <select
                        id="user-select"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="w-full sm:w-auto bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select a user</option>
                        {
                            users.length < 1 ? (
                                <option value="" disabled>No users available</option>
                            ) : (
                                users.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.fullName}
                                    </option>
                                ))
                            )
                        }
                    </select>
                    <button
                        onClick={handleClaimPoints}
                        disabled={isClaiming}
                        className="w-full sm:w-auto cursor-pointer bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isClaiming ? 'Claiming...' : 'Claim Points'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
