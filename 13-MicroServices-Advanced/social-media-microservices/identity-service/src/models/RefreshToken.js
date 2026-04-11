const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
    }
},
    {
        timestamps: true
    }
);

refreshTokenSchema.index({ expiresAt: 1 }, { expiresAfterSeconds: 60 * 5 });

refreshTokenSchema.methods.validateToken = async function (token) {
    return this.token === token;
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;