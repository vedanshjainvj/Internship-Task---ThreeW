// -------------------- PACKAGE IMPORT FILES -------------------- //
import express from 'express';

// --------------- Importing Other Files --------------- //
import asyncHandler from '../utilities/asyncHandler.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// -------------------- ROUTES -------------------- //
router.route('/get-all-users').get(asyncHandler(userController.getUsers));
router.route('/add-new-user').post(asyncHandler(userController.addUser));
router.route('/claim/:id').patch(asyncHandler(userController.updateUser));
router.route('/get-leaderboard').get(asyncHandler(userController.getLeaderboard));
router.route('/get-user/:id').get(asyncHandler(userController.getUser));

export default router;