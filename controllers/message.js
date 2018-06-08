const express = require('express');
const router = express.Router();
const message = require('../models/message');
const checkIfAuthenticated = require('../helper/checkToken');

router.route('/get').post(checkIfAuthenticated, (req, res, next) => {
    let data = {
        read: req.body.read,
        to_u_id: req.body.u_id
    }
    message.getUnreadMessages(data, (err, messages)=> {
        if(err) {
            res.json({success:false, message: 'Failed to get message. Error:' + err.message, error_code: err.code});
        }
        else {
			res.json({success: true, messages: messages});
			res.end();
        }
    });
});

router.route('/send').post(checkIfAuthenticated, (req, res, next) => {
    let data = new message({
		from_u_id: req.body.from_u_id,
		to_u_id: req.body.to_u_id,
		message: req.body.message,
		create_time: new Date().getTime()
    });
    message.sendMessage(data, (err, newMsg)=> {
        if(err) {
            res.json({success:false, message: 'Failed to send message. Error:' + err.message, error_code: err.code});
        }
        else {
            if(Object.keys(newMsg).length > 0) {
				res.json({success: true, messages: newMsg});
				res.end();
            } else {
                res.json({success:false, message: 'Failed to send message.'});
            }
        }
    });
});

module.exports = router;
