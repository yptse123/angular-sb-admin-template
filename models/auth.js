//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const AuthSchema = mongoose.Schema({
    username: {
		type: String,
		unique: true,
        required: true
    },
    email: {
		type: String,
		unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Auth = mongoose.model('Auth', AuthSchema);

Auth.getAccount = (acc, callback) => {
    Auth.find(acc, callback);
}

Auth.register = (newAcc, callback) => {
    newAcc.save(callback);
}

module.exports = Auth;
