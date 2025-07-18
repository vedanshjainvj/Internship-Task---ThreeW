// -------------------- PACKAGE IMPORT FILES -------------------- //
import React, { useState } from 'react';

// --------------- Importing Other Files --------------- //
import { addUser } from '../api/apiClient';

const AddUserForm = ({ refreshData }) => {
    const [fullName, setFullName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName.trim()) return;
        setIsAdding(true);
        const response = await addUser({ fullName });
        if (response.success) {
            setFullName('');
            await refreshData();
        }
        setIsAdding(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-4 flex-grow">
            <label htmlFor="new-user" className="font-medium text-slate-700">New User:</label>
            <input
                id="new-user"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className="w-full sm:flex-1 border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isAdding}
            />
            <button
                type="submit"
                disabled={isAdding}
                className="w-full sm:w-auto bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
                {isAdding ? 'Adding...' : 'Add User'}
            </button>
        </form>
    );
};

export default AddUserForm;