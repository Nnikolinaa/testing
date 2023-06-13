const router = require('express').Router();
const User = require('../models/user.model');

// Route for creating a new user
router.route('/add').post((req, res) => {
  try {
    // Retrieve user details from the request body
    const { username, email, password, fullName } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
      fullName
    });

    // Save the new user to the database
    newUser
      .save()
      .then(() => res.json('User created!'))
      .catch(err => res.status(400).json('Error: ' + err));

  } catch (error) {
    // Return an error message if user creation fails
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route for getting all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: 'Failed to retrieve users' }));
});

// Route for getting user details by ID
router.route('/:userId').get((req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: 'Failed to retrieve user details' }));
});


module.exports = router;
