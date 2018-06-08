//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = require('../helper/getPrivateKey');
const expiresIn = 172800;

router.route('/login').post((req, res, next) => {
    let acc = {
        email: req.body.email,
        password: req.body.password
    }
    auth.getAccount(acc, (err, verifiedAcc)=> {
        if(err) {
            res.json({success:false, message: 'Failed to login. Error:' + err.message, error_code: err.code});
        }
        else {
            if(verifiedAcc.length > 0) {
				jwt.sign({ email: verifiedAcc[0].email }, RSA_PRIVATE_KEY, { 
					algorithm: 'RS256',
					expiresIn: expiresIn,
					subject: verifiedAcc[0]._id.toString() 
				}, function(err, token) {
					res.json({success: true, verifiedAcc:verifiedAcc[0], token: token, expiresIn: expiresIn});
					res.end();
				});
            } else {
                res.json({success:false, message: `Failed to login.`});
            }
        }
    });
});

//POST HTTP method to /register

router.route('/register').post((req, res, next) => {
    let newAcc = new auth({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    auth.register(newAcc,(err, acc) => {
        if(err) {
            res.json({success: false, message: 'Failed to create a new acc. Error:' + err.message, error_code: err.code});
        }
        else {
			if(Object.keys(acc).length > 0) {
				jwt.sign({ email: acc['email'] }, RSA_PRIVATE_KEY, { 
					algorithm: 'RS256',
					expiresIn: expiresIn,
					subject: acc['_id'].toString() 
				}, function(err, token) {
					res.json({success: true, verifiedAcc:acc, token: token, expiresIn: expiresIn});
					res.end();
				});
            } else {
                res.json({success:false, message: `Failed to create a new acc.`});
            }
		}
    });

});

//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    res.send("DELETE");

})

module.exports = router;
