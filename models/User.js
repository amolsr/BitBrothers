var mongoose = require("mongoose");
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

UserSchema.index({ createdAt: 1 });
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('updateOne', async function (next) {
    if (!this._update.$set.password) return next();
    this._update.$set.password = await bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(ref.$set.password, salt).then(hash => {
            return hash;
        })
    })
    next();
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("User", UserSchema);
