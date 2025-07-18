// --------------- Importing Other Files --------------- //
import User from "../models/user.model.js";
import PointsHistory from "../models/pointsHistory.js";

class userRepository {

    // ------------------ Count users ------------------ //
    async countUsers() {
        return await User.countDocuments();
    }

    // ------------------ Get all users ------------------ //
    async getAllUsers({ skip = 0, limit = 10 } = {}) {
        return await User.find({}).sort({ totalPoints: -1 }).skip(skip).limit(limit);
    }

    async getAllUsersList() {
        return await User.find({}).sort({ totalPoints: -1 });
    }

    // ------------------ Add New User ------------------ //
    async addNewUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    // ------------------ Update User ------------------ //
    async updateUser(userId, userData) {
        const session = await User.startSession();
        session.startTransaction();
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $inc: { totalPoints: userData.score },
                ...userData
            }, { new: true });
            if (!updatedUser) {
                throw new Error("User not found");
            }
            const pointsHistoryExists = await PointsHistory.exists({ userId: updatedUser._id });
            if (!pointsHistoryExists) {
                const pointsHistory = await PointsHistory.create([{
                    userId: updatedUser._id,
                    history: [{
                        pointIncreased: userData.score,
                        totalPoints: updatedUser.totalPoints
                    }]
                }], { session });
            }
            else {
                const pointsHistory = await PointsHistory.updateOne(
                    { userId: updatedUser._id },
                    {
                        $push: {
                            history: {
                                pointIncreased: userData.score,
                                totalPoints: updatedUser.totalPoints
                            }
                        }
                    },
                    { session }
                );
                console.log(pointsHistory);
            }

            await session.commitTransaction();
            return updatedUser;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    // ------------------ Find User By ID ------------------ //
    async getUserById(userId) {
        return await User.findById(userId);
    }
}

export default new userRepository();
