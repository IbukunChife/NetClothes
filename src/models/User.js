const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

//Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    cart: [],
    bought: [],
    isAdmin: {
        type: Boolean,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Password Crypt
UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

//isCorrectPassword
UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model("User", UserSchema);;