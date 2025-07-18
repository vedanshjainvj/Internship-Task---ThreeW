// --------------- Importing Other Files --------------- //
import APIError from '../utilities/apiError.js';
import userRepository from "../repository/user.repository.js";
import statusCodeUtility from "../utilities/statusCodeUtility.js";
import { getPagination } from '../utilities/paginationUtility.js';
import { generateRandomScore } from '../utilities/generateScore.js';
import pointHistoryRepository from '../repository/pointHistory.repository.js';

class UserService {

    // ------------------ Get all users ------------------ //
    async getAllUsersService() {
        const users = await userRepository.getAllUsersList();
        if (!users) {
            throw new APIError(statusCodeUtility.NotFound, "No users found");
        }
        return users;
    }

    // ------------------ Add New User ------------------ //
    async addNewUserService(userData) {
        const newUser = await userRepository.addNewUser(userData);
        if (!newUser) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to add new user");
        }
        return newUser;
    }

    // ------------------ Update User ------------------ //
    async updateUserService(userId, userData) {
        const score = generateRandomScore();
        const updatedUser = await userRepository.updateUser(userId, {
            score: score,
        });
        if (!updatedUser) {
            throw new APIError(statusCodeUtility.InternalServerError, "Failed to update user");
        }
        return updatedUser;
    }

    // ------------------ Get Leaderboard ------------------ //
    async getLeaderboardService(query) {
        const totalItems = await userRepository.countUsers();
        const { skip, limit, totalPages } = getPagination(query, totalItems);
        const users = await userRepository.getAllUsers({ skip, limit });
        if (!users) {
            throw new APIError(statusCodeUtility.NotFound, "No users found for leaderboard");
        }
        const sortedUsers = users.sort((a, b) => b.score - a.score);
        return {
            sortedUsers: sortedUsers,
            pagination: {
                page: query.pageNo || 1,
                limit: query.limit || 5,
                totalPages: totalPages,
                totalItems: totalItems
            }
        };
    }

    // ------------------ Get User by ID ------------------ //
    async getUserService(userId, query) {
        const totalItems = await pointHistoryRepository.countHistoryArray(userId);
        const { skip, limit, totalPages } = getPagination(query, totalItems);
        const [user, history] = await Promise.all([
            userRepository.getUserById(userId),
            pointHistoryRepository.getUserHistory(userId, { skip, limit })
        ]);
        if (!history) {
            throw new APIError(statusCodeUtility.NotFound, "User history not found");
        }
        if (!user) {
            throw new APIError(statusCodeUtility.NotFound, "User not found");
        }
        return {
            userDetails: {
                user,
                history: history.history || [],
            },
            pagination: {
                page: query.pageNo || 1,
                limit: query.limit || 10,
                totalPages: totalPages,
                totalItems: totalItems
            }
        };
    }

}

export default new UserService();