const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const userRouter = express.Router();
const bookRouter = require("./book.routes");
const userModel = require("../models/user");
const bookModel = require("../models/book");
var config = require("../config");
var authorize = require("../middlewares/auth");
const _ = require("lodash");
const { check, validationResult } = require('express-validator');

// register an entirely new user
userRouter.post('/register',
 [
        check('username')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ],
    (req, res, next) => {
    	const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
        	bcrypt.hash(req.body.password, 12).then((hash) => {
			const user = new userModel({
				username: req.body.username,
				password: hash,
				email: req.body.email
			});
			user.save().then((response) => {
				res.status(201).json({
					message: 'created user with success',
					result: response
				});
			}).catch(error => {
				res.status(500).json({
					error: error
					});
				});
			});
        }	
	});

// log-in with existing user
userRouter.post("/login", (req, res, next) => {
    let getUser;
    userModel.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Cannot find user"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Password incorrect"
            });
        }
        var jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, config.jwt_secret, {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

// get all users
userRouter.route('/user').get(authorize,(req, res, next) => {
    userModel.find((error, response) => {
            if (error) {
                return next(error)
            } else {
                res.status(200).json(response)
            }
        })
})
    

// get user
userRouter.route('/user/:id').get(authorize, (req, res, next) => {
    userModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// change user attributes
userRouter.route('/update-user/:id').put((req, res, next) => {
    userModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})

// delete user
userRouter.route('/delete-user/:id').delete((req, res, next) => {
    userModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

//-------------------------



userRouter.use('/user/:userId/books', authorize, bookRouter);






//-------------------------



module.exports = userRouter;