// --------------- Importing Other Files --------------- //
import userService from "../services/user.service.js";
import ResponseHandler from "../utilities/apiResponse.js";
import statusCodeUtility from "../utilities/statusCodeUtility.js";

const messages = {
    success: ["Users fetched successfully", "User added successfully", "User updated successfully"],
    error: ["Failed to fetch users", "Failed to add user", "Insufficient data provided"]
}

class UserController {

    async getUsers(request, response) {
        const users = await userService.getAllUsersService();
        const io = request.app.get("io");
        io.emit("usersUpdated", users);
        return ResponseHandler(
            statusCodeUtility.Success,
            messages.success[0],
            users,
            response
        );
    }

    async addUser(request, response) {
        if (!request.body) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                messages.error[2],
                null,
                response
            );
        }
        const newUser = await userService.addNewUserService(request.body);
        const users = await userService.getAllUsersService();
        const io = request.app.get("io");
        io.emit("usersUpdated", users);
        return ResponseHandler(
            statusCodeUtility.Created,
            messages.success[1],
            newUser,
            response
        );
    }

    async updateUser(request, response) {
        const userId = request.params.id;
        if (!userId) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                messages.error[2],
                null,
                response
            );
        }
        const updatedUser = await userService.updateUserService(userId, request.body);
        const leaderboard = await userService.getLeaderboardService(request.query);
        const io = request.app.get("io");
        io.emit("leaderboardUpdated", leaderboard);
        return ResponseHandler(
            statusCodeUtility.Success,
            messages.success[2],
            updatedUser,
            response
        );
    }

    async getLeaderboard(request, response) {
        const leaderboard = await userService.getLeaderboardService(request.query);
        const io = request.app.get("io");
        io.emit("leaderboardUpdated", leaderboard);
        return ResponseHandler(
            statusCodeUtility.Success,
            messages.success[0],
            leaderboard,
            response
        );
    }

    async getUser(request, response) {
        const userId = request.params.id;
        if (!userId) {
            return ResponseHandler(
                statusCodeUtility.BadRequest,
                messages.error[2],
                null,
                response
            );
        }
        const user = await userService.getUserService(userId, request.query);
        return ResponseHandler(
            statusCodeUtility.Success,
            messages.success[0],
            user,
            response
        );
    }
}


export default new UserController();