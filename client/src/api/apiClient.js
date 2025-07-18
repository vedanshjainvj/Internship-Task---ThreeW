// -------------------- PACKAGE IMPORT FILES -------------------- //
import { io } from 'socket.io-client';

// --------------- Importing Other Files --------------- //
import instance from './axios';


const BackendUrl = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
const socket = io(BackendUrl);

export const getSocket = () => socket;

export const getLeaderboard = async ({ pageNo, limit }) => {
    const response = await instance.get('/get-leaderboard', {
        params: { pageNo, limit }
    });
    return response.data;
};

export const getAllUsers = async () => {
    const response = await instance.get('/get-all-users');
    return response.data;
};

export const addUser = async (userData) => {
    const response = await instance.post('/add-new-user', userData);
    return response.data;
};

export const claimPointsForUser = async (userId) => {
    const response = await instance.patch(`/claim/${userId}`);
    return response.data;
};

export const getUserHistory = async (userId, { pageNo = 1, limit = 10 } = {}) => {
    const response = await instance.get(`/get-user/${userId}`, {
        params: { pageNo, limit }
    });
    return response.data;
};
