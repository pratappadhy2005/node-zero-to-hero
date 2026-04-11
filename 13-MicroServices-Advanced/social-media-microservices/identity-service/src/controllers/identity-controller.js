//Import the User model to use for user registration
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const logger = require('../utils/logger');
const { validateRegisterUser, validateLoginUser, validateRefreshToken } = require('../utils/validation');
const { generateToken } = require('../utils/generateToken');

//user registration
const registerUser = async (req, res) => {
    logger.info('registerUser controller called');
    try {
        //validate the schema
        const { value, error } = validateRegisterUser(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`);
            return res.status(400).json({
                message: error.details[0].message,
                success: false,
            });
        }

        //create the user
        const { username, email, firstName, lastName, password } = value;

        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            logger.warn('Username or email already exists');
            return res.status(400).json({
                message: 'Username or email already exists',
                success: false,
            });
        }

        user = await User.create({
            username,
            email,
            password,
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
        logger.error(`User registerUser error: ${error.message}`);
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

//user login
const loginUser = async (req, res) => {
    logger.info('loginUser controller called');
    try {
        //validate the schema
        const { value, error } = validateLoginUser(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`);
            return res.status(400).json({
                message: error.details[0].message,
                success: false,
            });
        }
        const { username, password } = value;

        //find the user
        let user = await User.findOne({ username });
        if (!user) {
            logger.warn('Username not found');
            return res.status(400).json({
                message: 'Username not found',
                success: false,
            });
        }

        //validate the password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            logger.warn('Password is not valid');
            return res.status(400).json({
                message: 'Password is not valid',
                success: false,
            });
        }

        //generate the tokens
        const { accessToken, refreshToken } = await generateToken(user);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
            refreshToken,
            userId: user._id,
        });
    } catch (error) {
        logger.error(`User loginUser error: ${error.message}`);
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

//refresh token
const refreshTokenUser = async (req, res) => {
    logger.info('refreshTokenUser controller called');
    try {
        //validate the schema
        const { value, error } = validateRefreshToken(req.body);
        if (error) {
            logger.warn(`Validation error: ${error.details[0].message}`);
            return res.status(400).json({
                message: error.details[0].message,
                success: false,
            });
        }
        const { refreshToken } = value;

        //find the token
        let token = await RefreshToken.findOne({ token: refreshToken });
        if (!token || token.expiresAt < new Date()) {
            logger.warn('Refresh token not found or expired');
            return res.status(400).json({
                message: 'Refresh token not found or expired',
                success: false,
            });
        }

        //validate user exists
        const user = await User.findById(token.user);
        if (!user) {
            logger.warn('User not found');
            return res.status(400).json({
                message: 'User not found',
                success: false,
            });
        }

        //validate the token
        const isTokenValid = await token.validateToken(refreshToken);
        if (!isTokenValid) {
            logger.warn('Refresh token is not valid');
            return res.status(400).json({
                message: 'Refresh token is not valid',
                success: false,
            });
        }

        //generate the tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateToken(user);

        //delete the old token
        await RefreshToken.deleteOne({ _id: token._id });

        res.status(200).json({
            success: true,
            message: 'Refresh token is valid',
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        logger.error(`User refreshTokenUser error: ${error.message}`);
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

//logout

module.exports = {
    registerUser,
    loginUser,
    refreshTokenUser,
};
