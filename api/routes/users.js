// Load required modules
const express = require('express'); // Express framework
const { User } = require('../models'); // User model from Sequelize
const { asyncHandler } = require('../middleware/asyncHandler'); // Middleware to catch async errors
const { authenticateUser } = require('../middleware/authUser'); // Middleware to authenticate users

// Create a new Express router instance
const router = express.Router();

/**
 * GET /api/users
 * Returns the currently authenticated user with only selected fields:
 * id, firstName, lastName, emailAddress
 */
router.get(
  '/',
  authenticateUser, // Ensures the user is logged in
  asyncHandler(async (req, res) => {
    const currentUser = req.currentUser; // Set by authenticateUser middleware
    if (!currentUser) return res.status(404).end(); // Return 404 if user not found

    // Pick only allowed fields to return
    const filteredUserData = {
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      emailAddress: currentUser.emailAddress,
    };

    res.status(200).json(filteredUserData); // Respond with user data
  })
);

/**
 * POST /api/users
 * Creates a new user in the database
 * Handles Sequelize validation and unique constraint errors
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      // Create user; no variable needed to avoid unused-vars error
      await User.create(req.body);
      res.location('/').status(201).end(); // 201 Created
    } catch (error) {
      // Handle validation errors from Sequelize
      if (
        ['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
          error.name
        )
      ) {
        // Map error messages and send as JSON
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        // Re-throw any unexpected errors
        throw error;
      }
    }
  })
);

// Export router to use in the main app
module.exports = router;
