//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const MessageSchema = mongoose.Schema({
    from_u_id: {
        type: String,
        required: true
	},
	to_u_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
	},
	read: {
		type: String,
		enum : [1,0],
        default: 0,
        required: true
    },
    create_time: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', MessageSchema);

Message.getUnreadMessages = (data, callback) => {
    Message.find(data, callback);
}

Message.sendMessage = (msg, callback) => {
    msg.save(callback);
}

module.exports = Message;
