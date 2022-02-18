let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

UserSchema.methods.removeUserPassword = function(){
    this.password = "";
}

UserSchema.pre('save', async function (callback) {
    let user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            user.password = hash;
            user.status = user.status ? 1 : 0
            callback();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);