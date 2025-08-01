// -------------------- PACKAGE IMPORT FILES -------------------- //
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    totalPoints: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

export default User;