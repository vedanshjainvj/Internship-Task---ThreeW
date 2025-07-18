// -------------------- PACKAGE IMPORT FILES -------------------- //
import mongoose from 'mongoose';

const pointsHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    history: [{
        pointIncreased: {
            type: Number,
            required: true
        },
        totalPoints: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

const PointsHistory = mongoose.model('PointsHistory', pointsHistorySchema);

export default PointsHistory;
