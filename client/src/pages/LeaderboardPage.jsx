// -------------------- PACKAGE IMPORT FILES -------------------- //
import React, { useState, useEffect, useCallback } from 'react';

// --------------- Importing Other Files --------------- //
import Pagination from '../components/Pagination';
import UserManagement from '../components/UserManagement';
import { getLeaderboard, getSocket } from '../api/apiClient';
import LeaderboardTable from '../components/LeaderboardTable';

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        totalItems: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = window.location.pathname;

    const fetchAndSetLeaderboard = useCallback(async (page = 1) => {
        try {
            setIsLoading(true);
            const response = await getLeaderboard({ pageNo: page, limit: 10 });
            const sortedData = response.data.sortedUsers
                .sort((a, b) => b.totalPoints - a.totalPoints)
                .map((user, index) => ({ ...user, rank: response.data.pagination.page * response.data.pagination.limit + index + 1 - 10 }));

            setLeaderboard(sortedData);
            setPagination({
                page: response.data.pagination.page,
                limit: response.data.pagination.limit,
                totalPages: response.data.pagination.totalPages,
                totalItems: response.data.pagination.totalItems,
            });
            const socket = getSocket();

            socket.on("leaderboardUpdated", (updatedLeaderboard) => {
                const sortedUpdatedData = updatedLeaderboard.sortedUsers
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .map((user, index) => ({ ...user, rank: pagination.page * pagination.limit + index + 1 - 10 }));

                setLeaderboard(sortedUpdatedData);
            });

            return () => {
                socket.off("leaderboardUpdated");
            };
        } catch (err) {
            setError('Failed to fetch leaderboard data.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAndSetLeaderboard();
    }, [fetchAndSetLeaderboard]);

    return (
        <div>
            {location != "/leaderboard" && <UserManagement refreshData={fetchAndSetLeaderboard} />}
            {isLoading && <p>Loading leaderboard...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && <LeaderboardTable data={leaderboard} />}
            {!isLoading && !error && (
                <div className="mt-6">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={fetchAndSetLeaderboard}
                    />
                </div>
            )}
        </div>
    );
};

export default LeaderboardPage;