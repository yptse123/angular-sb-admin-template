//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const checkIfAuthenticated = require('../helper/checkToken');

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

router.route('/login').post((req, res, next) => {
    let acc = {
        email: req.body.email,
        password: req.body.password
    }
    auth.getAccount(acc, (err, verifiedAcc)=> {
        if(err) {
            res.json({success:false, message: `Failed to login. Error: ${err}`});
        }
        else {
            if(verifiedAcc.length > 0) {
				let expiresIn = 172800;
				jwt.sign({ email: verifiedAcc[0].email }, RSA_PRIVATE_KEY, { 
					algorithm: 'RS256',
					expiresIn: expiresIn,
					subject: verifiedAcc[0]._id.toString() 
				}, function(err, token) {

					res.json({success: true, verifiedAcc:verifiedAcc, token: token, expiresIn: expiresIn});
					res.end();
				});
            } else {
                res.json({success:false, message: `Failed to login.`});
            }
        }
    });
});

//POST HTTP method to /bucketlist

router.route('/register').post(checkIfAuthenticated, (req, res, next) => {
    let newAcc = new auth({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    auth.register(newAcc,(err, acc) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new acc. Error: ${err}`});
        }
        else
            res.json({success:true, message: "Added successfully."});
    });

});

//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    res.send("DELETE");

})

module.exports = router;
