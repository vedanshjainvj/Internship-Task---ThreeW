// --------------- Importing Other Files --------------- //
import PointsHistory from "../models/pointsHistory.js";

class PointsHistoryRepository {

    async countHistoryArray(userId) {
        const userHistory = await PointsHistory.findOne({ userId }).select({ history: 1 });
        if (!userHistory) {
            return 0; // No history found for the user
        }
        return userHistory ? userHistory.history.length : 0;
    }

    async getUserHistory(userId, { skip = 0, limit = 10 } = {}) {
        return await PointsHistory.findOne({ userId })
            .select({
                history: { $slice: [skip, limit] }
            })
            .sort({ 'history.date': -1 });
    }
}

export default new PointsHistoryRepository();