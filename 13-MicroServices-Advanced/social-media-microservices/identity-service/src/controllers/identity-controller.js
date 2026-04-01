const RefreshToken = require('../models/RefreshToken');

//Import the User model to use for user registration
const User = require('../models/User');
const logger = require('../utils/logger');
const { validateRegisterUser } = require('../utils/validation');
const { generateToken } = require('../utils/generateToken');

//user registration
const registerUser = async (req, res) => {
    logger.info('registerUser controller called');
    try {
        //validate the schema
        const { error } = validateRegisterUser(req.body);
        if (error) {
            res.status(400).json({
                message: error.details[0].message,
                success: false,
            });
            logger.warn('Validation error:', error.details[0].message);
            return res.status(400).json({
                message: error.details[0].message,
                success: false,
            });
        }

        //create the user
        const { username, email, firstName, lastName } = req.body;

        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            logger.warn('Username or email already exists');
            res.status(400).json({
                message: 'Username or email already exists',
                success: false,
            });
        }

        user = await User.save({
            username,
            email,
            password: req.body.password,
            firstName,
            lastName,
        });
        logger.info('User registered successfully', user._id);

        //generate the tokens
        const { accessToken, refreshToken } = await generateToken(user);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        logger.error('User registerUser error:', error.message);
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

//user login

//refresh token

//logout

module.exports = {
    registerUser,
}